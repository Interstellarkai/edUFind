import React, { useState } from "react";

import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

import styled from "styled-components";

import { IconButton } from "@mui/material";
import {
  ADDSHORTLIST,
  DELETESHORTLISTED,
  publicRequest,
} from "../requestMethod";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setShortlistDelete } from "../redux/shortlistDeleteRedux";
import { setShortlistAdd } from "../redux/shortlistAddRedux";
import { yellow } from "@mui/material/colors";
import PAGES from "../pageRoute";
const Container = styled.div`
  width: 25%;
  background-color: white;
  margin: 20px;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  box-shadow: rgba(81, 83, 85, 0.2) 0px 8px 24px;
`;

const SchoolNameWrapper = styled.div`
  margin: 10px;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
`;

const SchoolName = styled(Link)`
  padding-top: 5px;
  font-size: 23px;
  font-weight: 700;
  color: black;
  text-decoration: none;
`;

const SchoolAddress = styled.p`
  padding-top: 10px;
  font-size: 15px;
  font-weight: 700;
`;

const WrapperShowMore = styled.div`
  /* text-align: center; */
  /* border: solid black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Expandable = styled.div`
  /* border: solid black; */
  display: flex;
  /* position: relative; */
  width: 100%;
  height: ${(props) => (props.expanded ? 460 : 0)}px;
  /* height: fit-content; */
  transition: height 0.5s ease-in-out;
  overflow: hidden;
  /* width: 100%; */
`;

const UlContainer = styled.div`
  overflow: ${(props) => !props.expanded && "hidden"};
  transition: height 0.5s ease-in-out;
  /* border: solid black; */
`;

const Ul = styled.ul`
  /* z-index: 1; */
  padding: 0;
  margin-left: 3px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
  list-style: none;
`;
const Li = styled.li`
  margin-bottom: 20px;
  word-break: break-all;
`;

const A = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: darkblue;
  &:hover {
    text-decoration: underline;
    font-weight: 600;
  }
`;

const ShowMore = styled.button`
  border: solid black;
  border-radius: 25px;
  border-color: #9fd1ff;
  border-width: 1px;
  background-color: white;
  /* border: 1px solid teal; */
  color: black;
  font-weight: bold;
  font-size: 12px;
  padding: 5px;
  margin-top: 25px;
  margin-bottom: 8px;
  transition: all ease 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #9fd1ff;
    /* color: white; */
  }
`;

const RecommendedSchool = ({ sch, shortlistedSchools, currentUser }) => {
  const [expanded, setExpanded] = useState(false);
  const [schoolLink, setSchoolLink] = useState(
    PAGES.schoolPage + `/${sch.school_name.replace(/ /gi, "_")}`
  );
  const dispatch = useDispatch();
  const handleClick = async () => {
    let userComment = prompt(
      `Enter comments for ${sch.school_name.toUpperCase()} `,
      "Type your comments here"
    );
    console.log(userComment);
    if (userComment === null) return;
    const res = await publicRequest.post(
      ADDSHORTLIST,
      {
        user_id: currentUser.userId,
        school_name: sch.school_name,
        school_notes: userComment,
      },
      { headers: { authorization: currentUser.token } }
    );
    dispatch(setShortlistAdd());
  };

  const handleClickDelete = async () => {
    const id = shortlistedSchools.filter(
      (item) => item.school_name === sch.school_name
    )[0].shortlist_id;
    // console.log(id);

    try {
      const res = await publicRequest.delete(
        DELETESHORTLISTED(currentUser.userId),
        {
          data: {
            shortlist_id: id,
          },
          headers: { authorization: currentUser.token },
        }
      );

      dispatch(setShortlistDelete());
      //   navigate(PAGES.shortlistPage);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIn = () => {
    return shortlistedSchools.some(
      (item) => item.school_name === sch.school_name
    );

    // return false;
  };
  return (
    <Container expanded={expanded}>
      <SchoolNameWrapper>
        <Top>
          <SchoolName to={schoolLink}>{sch.school_name}</SchoolName>

          {checkIn() ? (
            <IconButton>
              <BookmarkRoundedIcon
                sx={{ fontSize: "30px", color: yellow[700] }}
                onClick={handleClickDelete}
              />
            </IconButton>
          ) : (
            <IconButton>
              <BookmarkBorderRoundedIcon
                onClick={handleClick}
                sx={{ fontSize: "30px" }}
              />
            </IconButton>
          )}
        </Top>
        <SchoolAddress>{sch.address}</SchoolAddress>
      </SchoolNameWrapper>

      <WrapperShowMore>
        <Expandable expanded={expanded}>
          <UlContainer expanded={expanded}>
            <Ul>
              <Li>Postal Code: {sch.postal_code}</Li>
              <Li>MRT: {sch.mrt_desc}</Li>
              <Li>Bus: {sch.bus_desc}</Li>
              <Li>Region: {sch.zone_code}</Li>
              <Li>Gender Type: {sch.nature_code}</Li>
              <Li>Education Level: {sch.mainlevel_code}</Li>
              <Li>Contact: {sch.telephone_no}</Li>
              <Li>
                Website: <A href={sch.url_address}>{sch.url_address}</A>
              </Li>
            </Ul>
          </UlContainer>
        </Expandable>
        <ShowMore onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show me less" : "Show me more"}
        </ShowMore>
      </WrapperShowMore>
    </Container>
  );
};

export default RecommendedSchool;

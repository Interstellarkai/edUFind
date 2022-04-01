import React, { useState } from "react";

import styled from "styled-components";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import { DELETESHORTLISTED, publicRequest } from "../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import PAGES from "../pageRoute";
import { Link } from "react-router-dom";
import { setShortlistDelete } from "../redux/shortlistDeleteRedux";
const Container = styled.div`
  width: 25%;
  /* min-height: 300px; */
  background-color: white;
  margin: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(60, 60, 61, 0.2) 8px 8px 24px;
  border-radius: 10px;
`;

const SchoolNameWrapper = styled.div`
  /* border: solid black; */
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

const RemoveIconContainer = styled.div`
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SchoolAddress = styled.p`
  padding-top: 10px;
  font-size: 15px;
  font-weight: 700;
`;

const PersonalNotesWrapper = styled.div`
  display: flex;
`;

const Empty = styled.div`
  flex: 1;
`;
const PersonalNotesTitle = styled.p`
  flex: 1;
  text-align: end;
  padding-right: 10px;
  border-radius: 10px;
  /* border: solid black; */
  border-radius: 100px 0 0 10px;
  /* padding: 5px; */
  background-color: lightgreen;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 10px;
  padding-left: 6px;
  cursor: pointer;

  white-space: ${(props) => !props.textExpand && "nowrap"};
  transition: white-space 0.5s ease-in-out;
  overflow: hidden;
  text-overflow: ellipsis;
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
  height: ${(props) => (props.expanded ? 350 : 0)}px;
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
  /* border: solid black; */
  /* margin: 0; */
  padding: 0;
  margin-left: 10px;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: 500;
  list-style: none;
  align-items: left;
`;
const Li = styled.li`
  margin-bottom: 10px;
  word-break: break-all;
  /* border: black solid; */
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

const ShortlistedSchool = ({ sch, notes, id }) => {
  const currentUserId = useSelector((state) => state.user.value.userId);
  const currentUserToken = useSelector((state) => state.user.value.token);
  const [textExpand, setTextExpand] = useState(false);
  const [schoolLink, setSchoolLink] = useState(
    PAGES.schoolPage + `/${sch.school_name.replace(/ /gi, "_")}`
  );
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const handleClick = async () => {
    // Delete
    try {
      const res = await publicRequest.delete(DELETESHORTLISTED(currentUserId), {
        data: {
          shortlist_id: id,
        },
        headers: { authorization: currentUserToken },
      });

      dispatch(setShortlistDelete());
      //   navigate(PAGES.shortlistPage);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(expanded);
  return (
    <Container expanded={expanded}>
      <SchoolNameWrapper>
        <Top>
          <SchoolName to={schoolLink}>{sch.school_name}</SchoolName>

          <IconButton onClick={handleClick}>
            <RemoveIconContainer>
              <DeleteOutlineIcon sx={{ fontSize: "25px" }} />
            </RemoveIconContainer>
          </IconButton>
        </Top>
        <SchoolAddress>{sch.address}</SchoolAddress>
      </SchoolNameWrapper>
      <PersonalNotesWrapper>
        <Empty></Empty>
        <PersonalNotesTitle
          textExpand={textExpand}
          onClick={() => setTextExpand(!textExpand)}
        >
          Remarks: {notes}
        </PersonalNotesTitle>
      </PersonalNotesWrapper>
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

export default ShortlistedSchool;

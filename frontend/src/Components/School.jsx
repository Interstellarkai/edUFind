import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import {
  ADDSHORTLIST,
  DELETESHORTLISTED,
  publicRequest,
} from "../requestMethod";
import { setShortlistAdd } from "../redux/shortlistAddRedux";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import { setShortlistDelete } from "../redux/shortlistDeleteRedux";
import { Link, useNavigate } from "react-router-dom";
import PAGES from "../pageRoute";

const Container = styled.div`
  /* display: flex; */
  /* width: 100%; */
  /* border: black solid; */
  /* background-color: white; */
  margin-bottom: 25px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all ease 0.3s;
  &:hover {
    transform: scale(1.03);
    border: solid 0.5px;
    box-shadow: 0 0 10px #9ecaed;
  }
`;

const Wrapper = styled.div`
  display: flex;
  background-color: white;
  padding: 10px;
  justify-content: space-between;
  /* min-height: 120px; */
  /* border: solid black 0.2px; */
`;

const WrapperSchoolDetails = styled.div`
  cursor: pointer;
`;

const SchoolName = styled.h1`
  padding-top: 5px;
  font-size: 25px;
  font-weight: 700;
  /* border: 1px solid teal; */
`;

const SchoolAddress = styled.p`
  padding-top: 5px;
  font-size: 16px;
  color: #656565;
`;

const AddIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  /* cursor: ${(props) => props.disabled === "false" && "pointer"}; */
  cursor: pointer;
`;

const School = ({ sch, shortlistedSchools }) => {
  const currentUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkClick = () => {
    console.log(sch.school_name);
    navigate(`${PAGES.schoolPage}/${sch.school_name.replace(/ /gi, "_")}`);
  };

  const handleClick = async () => {
    if (currentUser.username === false) {
      alert("Account needed to shortlist schools");
      return;
    }
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
    <Container>
      <Wrapper>
        <WrapperSchoolDetails onClick={linkClick}>
          <SchoolName>{sch.school_name}</SchoolName>
          <SchoolAddress>{sch.address}</SchoolAddress>
        </WrapperSchoolDetails>

        {checkIn() ? (
          <AddIconWrapper>
            <BookmarkRoundedIcon
              sx={{ fontSize: "30px" }}
              onClick={handleClickDelete}
            />
          </AddIconWrapper>
        ) : (
          <AddIconWrapper>
            <BookmarkBorderRoundedIcon
              onClick={handleClick}
              sx={{ fontSize: "30px" }}
            />
          </AddIconWrapper>
        )}
        {/* } */}
      </Wrapper>
    </Container>
  );
};

export default School;

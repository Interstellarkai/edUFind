import styled from "styled-components";
import Navbar from "../Components/Navbar";
import {
  FilterCcaSchool,
  GETSCHOOL,
  getSchoolEP,
  getSchoolSubject,
  getSpecialNeedsSchool,
  publicRequest,
} from "../requestMethod";
import locationLogo from "../Logos/location.png";
import wwwLogo from "../Logos/www.png";
import phoneLogo from "../Logos/phone.png";
import emailLogo from "../Logos/email.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import CommentSection from "../Components/CommentComponents/CommentSection";
import CancelIcon from "@mui/icons-material/Cancel";

import { useEffect, useState } from "react";

// everything below is from https://mui.com/components/lists/

import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import CalculateIcon from "@mui/icons-material/Calculate";
import LanguageIcon from "@mui/icons-material/Language";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InfoIcon from "@mui/icons-material/Info";
import DirectionsIcon from "@mui/icons-material/Directions";
import CommentIcon from "@mui/icons-material/Comment";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

const Container = styled.div`
  min-height: 100vh;
  // width: 100vw;
  /* background-color: #ffe7c3; */
`;

const WrapperContainer = styled.div`
  /* height: 80%; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* border: black solid; */
`;

const Wrapper = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
  /* border: solid blue; */
  /* height: 100%; */
`;

const SchoolWrapperContainer = styled.div`
  // background-color: #bcd2e8;
  background-color: #004175;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SchoolWrapper = styled.div``;

const AboutWrapperContainer = styled.div`
  background-color: #264e70;
`;

const AboutWrapper = styled.div``;

const GettingThereWrapperContainer = styled.div`
  // background-color: #fdebd3;
  background-color: #264e70;
  padding-top: 20px;
  padding-bottom: 10px;
`;

const GettingThereWrapper = styled.div``;

const CommentsWrapperContainer = styled.div`
  background-color: #bcd2e8;
`;

const CommentsWrapper = styled.div``;

const SchoolHeader = styled.h1`
  // font-size: 72px;
  font-size: 50px;
  // color: #000000;
  color: #ffffff;
  // font-weight: bold;
  font-weight: normal;
  margin-left: 10px;
`;

const BasicInfoText = styled.p`
  font-size: 24px;
  color: #000000;
  // color: #FFFFFF;
  margin-top: 10px;
`;

const SidebarDropdown = styled.select`
  border: none;
  padding: 5px;
  display: flex;
  height: fit-content;
  width: 85%;
  cursor: pointer;
  font-size: 15px;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: normal;
`;

const Option = styled.option``;

const OfferingText = styled.p`
  font-size: 24px;
  color: #000000;
  // color: #FFFFFF;
  font-weight: medium;
  margin-left: 10px;
`;

const AboutHeader = styled.h2`
  font-size: 40px;
  // color: #fdebd3;
  color: black;
  font-weight: medium;
  margin-left: 10px;
`;

const AboutText = styled.p`
  // font-size: 32px;
  font-size: 24px;
  // color: #fdebd3;
  color: black;
  margin-left: 10px;
`;

const GettingThereHeader = styled.h2`
  font-size: 40px;
  // color: #264e70;
  color: black;
  font-weight: medium;
  margin-left: 10px;
`;

const GettingThereText = styled.p`
  // font-size: 32px;
  font-size: 24px;
  // color: #264e70;
  color: black;
  margin-left: 20px;
`;

const CommentsHeader = styled.h3`
  font-size: 40px;
  color: #000000;
  font-weight: medium;
`;

const Button = styled.button`
  width: 20%;
  margin: 20px 0;
  padding: 5px;
  border: none;
  color: white;
  font-weight: 600;
  background-color: #5a5add;
  cursor: pointer;
`;

const ShortlistButton = styled.button``;

const CommentButton = styled.button``;

const Icon = styled.image``;

const CommentsForm = styled.form``;

const CommentInput = styled.input`
  padding: 10px;
  font-weight: 600;

  font-family: ${(props) =>
    props.type === "password" && "Verdana, Geneva, Tahoma, sans-serif"};

  letter-spacing: ${(props) => props.type === "password" && "0.125em"};
`;

const Li = styled.li`
  width: 80%;
  display: flex;
  list-style-type: disc;
  /* border: solid black; */
`;

const LeftLi = styled.div`
  flex: 1;
`;
const RightLi = styled.div`
  flex: 1;
`;
// const res = await publicRequest.get(GETSCHOOL(schName)); //using the API to get school data
// res.data.schools[0].postal_code <- getting the data, and storing it into a variable

// const schoolName = res.data.schools[0].school_name;
// const schoolAddress = res.data.schools[0].address;
// const schoolPostalCode = res.data.schools[0].postal_code
// const schoolWebsite = res.data.schools[0].url_address;
// const schoolNature = res.data.schools[0].nature_code;
// const schoolType = res.data.schools[0].type_code;
// const nearestMRT = res.data.schools[0].mrt_desc;
// const nearestBus = res.data.schools[0].bus_desc;

/*

const getMTLs = () => {
    var mtlArray = [];

    const fetchedMTL1 = res.data.schools[0].mothertongue1_code;
    const fetchedMTL2 = res.data.schools[0].mothertongue2_code;
    const fetchedMTL3 = res.data.schools[0].mothertongue3_code;

    if (fetchedMTL1 != "na") {
        mtlArray.push(fetchedMTL1);
    }

    if (fetchedMTL2 != "na") {
        mtlArray.push(fetchedMTL2);
    }

    if (fetchedMTL3 != "na") {
        mtlArray.push(fetchedMTL3);
    }


}

const getCCAs = () => {
    var ccaArray = [];

    const fetchedCCA = res.data.schools[0].cca_generic_name;

    for (var i of fetchedCCA) {
        ccaArray.push(i);
    }

}

const getElectives = () => {
    var electivesArray = [];

    const fetchedElectives = res.data.schools[0].moe_programme_desc;

    for (var i of fetchedElectives) {
        electivesArray.push(i);
    }
}

const getSubjects = () => {
    var subjectsArray = [];

    const fetchedSubjects = res.data.schools[0].subject_desc;

    for (var i of fetchedSubjects) {
        subjectsArray.push(i);
    }
}


*/

const SchoolProfilePage = () => {
  const [school, setSchool] = useState("");
  const [ccaList, setCcaList] = useState([]);
  const [subjList, setSubjList] = useState([]);
  const [epList, setEpList] = useState({});
  const [specialneeds, setSpecialneeds] = useState({});
  const [mtlList, setMtlList] = useState([]);
  const [googleMapAddress, setGoogleMapAddress] = useState("");

  // testing using MUI
  const [openCCA, setOpenCCA] = React.useState(false);

  const googleMapBase = "https://google.com/maps/place/";

  const handleClickCCA = () => {
    setOpenCCA(!openCCA);
  };

  const [openSubject, setOpenSubject] = React.useState(false);

  const handleClickSubject = () => {
    setOpenSubject(!openSubject);
  };

  const [openMTL, setOpenMTL] = React.useState(false);

  const handleClickMTL = () => {
    setOpenMTL(!openMTL);
  };

  const [openElectives, setOpenElectives] = React.useState(false);

  const handleClickElectives = () => {
    setOpenElectives(!openElectives);
  };

  const [openSpecEdSupp, setOpenSpecEdSupp] = React.useState(false);

  const handleClickSpecEdSupp = () => {
    setOpenSpecEdSupp(!openSpecEdSupp);
  };

  // Get school
  useEffect(async () => {
    // Get school name
    const schName = window.location.href.split("/")[4].replace(/_/gi, " ");
    try {
      const res = await publicRequest.get(GETSCHOOL(schName));
      setSchool(res.data.schools[0]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(async () => {
    // CCA
    try {
      const ccaRes = await publicRequest.get(
        FilterCcaSchool(school.school_name)
      );
      const ccas = [];
      ccaRes.data.CCAs.map((item) => ccas.push(item.cca_generic_name));

      setCcaList(ccas);
    } catch (err) {
      console.log(err);
    }

    // Subjects
    try {
      const subjRes = await publicRequest.get(
        getSchoolSubject(school.school_name)
      );
      //   console.log(subjRes);
      const subjects = [];
      subjRes.data.Subjects.map((item) => subjects.push(item.subject_desc));
      setSubjList(subjects);
    } catch (err) {
      console.log(err);
    }

    // Elective Program
    try {
      const epRes = await publicRequest.get(getSchoolEP(school.school_name));
      console.log(epRes);
      if (epRes.data.total_results !== 0) {
        const ep = epRes.data.programmes[0];
        console.log("EP: ", ep);
        setEpList(ep);
      }
    } catch (err) {
      console.log(err);
    }

    // Support For Education Needs
    try {
      const specialNeedsRes = await publicRequest.get(
        getSpecialNeedsSchool(school.school_name)
      );

      if (specialNeedsRes.data.total_results !== 0) {
        // console.log(specialNeedsRes.data.SpecialNeeds);
        setSpecialneeds(specialNeedsRes.data.SpecialNeeds[0]);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      var mtlArray = [];
      const fetchedMTL1 = school.mothertongue1_code;
      const fetchedMTL2 = school.mothertongue2_code;
      const fetchedMTL3 = school.mothertongue3_code;
      if (fetchedMTL1 != "na") {
        mtlArray.push(fetchedMTL1);
      }

      if (fetchedMTL2 != "na") {
        mtlArray.push(fetchedMTL2);
      }

      if (fetchedMTL3 != "na") {
        mtlArray.push(fetchedMTL3);
      }

      setMtlList(mtlArray);
    } catch (err) {
      console.log(err);
    }

    try {
      setGoogleMapAddress(
        googleMapBase + school.school_name.replace(/ /gi, "+") + "/"
      );
    } catch (err) {
      console.log(err);
    }
    // console.log("MAP ADDR: ", googleMapAddress);
  }, [school]);

  // console.log("googleMapAddress", googleMapAddress);

  return (
    <Container>
      <Navbar />

      <SchoolWrapperContainer>
        <SchoolWrapper>
          <SchoolHeader>{school.school_name}</SchoolHeader>{" "}
          {/* insert schoolName here */}
          {/* <ShortlistButton></ShortlistButton> */}
          <div
            style={{
              backgroundColor: "white",
              width: "50%",
              margin: "0 auto",
              borderRadius: "25px",
              boxShadow: "5px 5px lightgrey",
            }}
          >
            <AboutHeader>
              <span>
                <InfoIcon
                  sx={{
                    height: "45px",
                    width: "45px",
                    marginBottom: "5px",
                    marginRight: "5px",
                  }}
                />
              </span>
              About
            </AboutHeader>
            <div
              style={{
                display: "flex",
                marginLeft: "10px",
                marginRight: "10px",
                alignItems: "center",
              }}
            >
              {/* <img src={locationLogo} style={{ height: "30px", width: "30px", margin: "10px 10px" }} /> */}
              <LocationOnIcon
                sx={{
                  color: "red",
                  height: "30px",
                  width: "30px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
              <a href={googleMapAddress} target="_blank">
                <BasicInfoText>
                  {school.address} <span>,</span> {school.postal_code}
                </BasicInfoText>{" "}
              </a>
              {/* insert schoolAddress and schoolPostalCode here and find a way to hyperlink this to google maps! */}
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: "10px",
                marginRight: "10px",
                alignItems: "center",
              }}
            >
              {/* <img src={wwwLogo} style={{ height: "30px", width: "30px", margin: "10px 10px" }} /> */}
              <LinkIcon
                sx={{
                  color: "grey",
                  height: "30px",
                  width: "30px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
              <a href={school.url_address} target="_blank">
                <BasicInfoText>{school.url_address}</BasicInfoText>{" "}
              </a>
              {/* insert schoolWebsite here */}
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: "10px",
                marginRight: "10px",
                alignItems: "center",
              }}
            >
              {/* <img src={phoneLogo} style={{ height: "30px", width: "30px", margin: "10px 10px" }} /> */}
              <PhoneIcon
                sx={{
                  color: "lime",
                  height: "30px",
                  width: "30px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
              <BasicInfoText>{school.telephone_no}</BasicInfoText>
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: "10px",
                marginRight: "10px",
                alignItems: "center",
              }}
            >
              {/* <img src={emailLogo} style={{ height: "30px", width: "30px", margin: "10px 10px" }} /> */}
              <EmailIcon
                sx={{
                  color: "black",
                  height: "30px",
                  width: "30px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
              <BasicInfoText>{school.email_address}</BasicInfoText>
            </div>
          </div>
        </SchoolWrapper>

        <SchoolWrapper>
          {/* <OfferingText>Co-Curricular Activites offered:</OfferingText>
          <ul>
            {ccaList.map((item) => (
              <li style={{ color: "white" }}>{item}</li>
            ))}
          </ul> */}
          {/* <SidebarDropdown defaultValue="">
            <Option value="" disabled>
              CCA
            </Option>
            {ccaList.map((item) => (
              <Option>{item}</Option>
            ))}
          </SidebarDropdown> */}

          {/* trying to use MUI for cca's offered */}

          <List
            sx={{
              width: "50%",
              bgcolor: "background.paper",
              margin: "50px auto 10px auto",
              borderRadius: "25px",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            // subheader={
            //   <ListSubheader component="div" id="nested-list-subheader">
            //     Co-Curricular Activities offered:
            //   </ListSubheader>
            // }
          >
            {/* <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SportsHandballIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton> */}
            <ListItemButton onClick={handleClickCCA}>
              <ListItemIcon>
                <SportsHandballIcon />
              </ListItemIcon>
              <ListItemText primary="CCAs" />
              {openCCA ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCCA} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* <ListItemButton sx={{ pl: 4 }}> */}
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                {ccaList.map((item) => (
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                ))}
                {/* <ListItemText primary="Starred" /> */}
                {/* </ListItemButton> */}
              </List>
            </Collapse>
          </List>

          {/* <div> */}
          {/* <OfferingText>Subjects offered:</OfferingText>
            <ul>
              <li>Subject 1</li>
              <li>Subject 2</li>
              <li>Subject 3</li>
            </ul>
            <SidebarDropdown defaultValue="">
              <Option value="" disabled>
                SUBJECTS
              </Option>
              {subjList.map((item) => (
                <Option>{item}</Option>
              ))}
            </SidebarDropdown> */}

          <List
            sx={{
              width: "50%",
              bgcolor: "background.paper",
              margin: "0px auto 10px auto",
              borderRadius: "25px",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            // subheader={
            //   <ListSubheader component="div" id="nested-list-subheader">
            //     Subjects offered:
            //   </ListSubheader>
            // }
          >
            {/* <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SportsHandballIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton> */}
            <ListItemButton onClick={handleClickSubject}>
              <ListItemIcon>
                <CalculateIcon />
              </ListItemIcon>
              <ListItemText primary="Subjects" />
              {openSubject ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSubject} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* <ListItemButton sx={{ pl: 4 }}> */}
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                {subjList.map((item) => (
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                ))}
                {/* <ListItemText primary="Starred" /> */}
                {/* </ListItemButton> */}
              </List>
            </Collapse>
          </List>
          {/* </div> */}

          {/* <OfferingText>MTLs offered:</OfferingText>
          <ul>
            {mtlList.map((item) => (
              <li>{item}</li>
            ))}
          </ul> */}

          <List
            sx={{
              width: "50%",
              bgcolor: "background.paper",
              margin: "0px auto 50px auto",
              borderRadius: "25px",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            // subheader={
            //   <ListSubheader component="div" id="nested-list-subheader">
            //     MTLs offered:
            //   </ListSubheader>
            // }
          >
            {/* <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SportsHandballIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton> */}
            <ListItemButton onClick={handleClickMTL}>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary="MTLs" />
              {openMTL ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMTL} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* <ListItemButton sx={{ pl: 4 }}> */}
                <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                {mtlList.map((item) => (
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={item} />
                  </ListItemButton>
                ))}
                {/* <ListItemText primary="Starred" /> */}
                {/* </ListItemButton> */}
              </List>
            </Collapse>
          </List>

          <div
            style={{
              backgroundColor: "white",
              width: "50%",
              margin: "0 auto",
              borderRadius: "25px",
              boxShadow: "5px 5px lightgrey",
            }}
          >
            <OfferingText>Elective Programmes offered:</OfferingText>
            <ul>
              <Li>Title: {epList.llp_title1}</Li>
              <Li>Domain: {epList.llp_domain1}</Li>
            </ul>
          </div>

          <div
            style={{
              backgroundColor: "white",
              width: "50%",
              margin: "0 auto",
              borderRadius: "25px",
              boxShadow: "5px 5px lightgrey",
            }}
          >
            <OfferingText>Support for Special Education Needs:</OfferingText>

            <ul>
              <Li>
                <LeftLi>Learning and Behaviour Support: </LeftLi>
                <RightLi>
                  {specialneeds["aed-learningnbehavl_suppt"] === "Yes" ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon sx={{ color: "red" }} />
                  )}
                </RightLi>
              </Li>
              <Li>
                <LeftLi>Barrier Free Facilities: </LeftLi>
                <RightLi>
                  {specialneeds.barrier_free_facilities === "Yes" ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon sx={{ color: "red" }} />
                  )}
                </RightLi>
              </Li>

              <Li>
                <LeftLi>Visual Impairment: </LeftLi>
                <RightLi>
                  {specialneeds.visual_impairment === "Yes" ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon sx={{ color: "red" }} />
                  )}
                </RightLi>
              </Li>
              <Li style={{ display: "Flex", justifyContent: "" }}>
                <LeftLi>Hearing Loss:</LeftLi>
                <RightLi>
                  {specialneeds.hearing_loss === "Yes" ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon sx={{ color: "red" }} />
                  )}
                </RightLi>
              </Li>

              {/* {Object.entries(specialneeds).map(([key, value]) => (
              <li>
                {key}:{value}
              </li>
            ))} */}
            </ul>
          </div>

          <div
            style={{
              backgroundColor: "white",
              width: "50%",
              margin: "0 auto",
              borderRadius: "25px",
              boxShadow: "5px 5px lightgrey",
            }}
          >
            <AboutText>School Nature: {school.nature_code}</AboutText>{" "}
            <AboutText>School Type: {school.type_code}</AboutText>{" "}
          </div>
        </SchoolWrapper>
      </SchoolWrapperContainer>

      {/* <AboutWrapperContainer>
        <AboutWrapper>
          <div style={{ backgroundColor: "white", width: "50%", margin: "0 auto", borderRadius: "25px", boxShadow: '5px 5px lightgrey' }}>
            <AboutHeader>About</AboutHeader>
            <AboutText>School Nature:{school.nature_code}</AboutText>{" "}
            <AboutText>School Type:{school.type_code}</AboutText>{" "}
            </div>
        </AboutWrapper>
      </AboutWrapperContainer> */}

      <GettingThereWrapperContainer>
        <GettingThereWrapper>
          <div
            style={{
              backgroundColor: "white",
              width: "50%",
              margin: "0 auto",
              borderRadius: "25px",
              boxShadow: "5px 5px lightgrey",
            }}
          >
            <GettingThereHeader>
              <span>
                <DirectionsIcon
                  sx={{
                    height: "45px",
                    width: "45px",
                    marginBottom: "5px",
                    marginRight: "5px",
                  }}
                />
              </span>
              Getting There
            </GettingThereHeader>
            <GettingThereText>
              <span>
                <TrainIcon
                  sx={{
                    height: "30px",
                    width: "30px",
                    marginBottom: "5px",
                    marginRight: "5px",
                  }}
                />
              </span>
              Nearest MRT Station: {school.mrt_desc}
            </GettingThereText>{" "}
            {/* insert nearestMRT here */}
            <GettingThereText>
              <span>
                <DirectionsBusIcon
                  sx={{
                    height: "30px",
                    width: "30px",
                    marginBottom: "5px",
                    marginRight: "5px",
                  }}
                />
              </span>
              Buses: {school.bus_desc}
            </GettingThereText>{" "}
            {/* insert nearestBus here */}
          </div>
        </GettingThereWrapper>
      </GettingThereWrapperContainer>

      {/* <CommentsWrapperContainer> */}
      {/* <CommentsWrapper> */}
      {/* <CommentsHeader>Comments</CommentsHeader> */}
      {/* <CommentsForm> */}
      {/* <CommentInput>Write a comment</CommentInput> */}
      {/* <CommentButton>View More Comments</CommentButton> */}
      {/* </CommentsForm> */}
      {/* </CommentsWrapper> */}
      {/* </CommentsWrapperContainer> */}

      {/* This block of code below is testing implementation of a comments feature */}
      <CommentsWrapperContainer>
        <CommentsWrapper>
          <CommentsHeader>
            <span>
              <CommentIcon
                sx={{
                  height: "45px",
                  width: "45px",
                  marginBottom: "5px",
                  marginRight: "5px",
                }}
              />
            </span>
            Comments
          </CommentsHeader>
          <CommentSection nameOfSchool={school.school_name} />
        </CommentsWrapper>
      </CommentsWrapperContainer>
    </Container>
  );
};

export default SchoolProfilePage;

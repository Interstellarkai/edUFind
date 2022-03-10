import React from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";

const Container = styled.div`
  /* display: flex; */
  /* width: 100%; */
  /* border: black solid; */
  /* background-color: white; */
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  background-color: white;
  padding: 10px;
  justify-content: space-between;
  /* border: solid black 0.2px; */
`;

const WrapperSchoolDetails = styled.div``;

const SchoolName = styled.h1`
  padding-top: 5px;
  font-size: 25px;
  font-weight: 700;
  /* border: 1px solid teal; */
`;

const SchoolAddress = styled.p`
  padding-top: 5px;
  font-size: 15px;
`;

const AddIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
`;

const School = ({ sch }) => {
  const handleClick = () => {
    console.log(sch.school_name);
  };
  return (
    <Container>
      <Wrapper>
        <WrapperSchoolDetails>
          <SchoolName>{sch.school_name}</SchoolName>
          <SchoolAddress>{sch.address}</SchoolAddress>
        </WrapperSchoolDetails>
        {/* <AddSchoolButton>Add</AddSchoolButton> */}
        <AddIconWrapper>
          <AddIcon onClick={handleClick} sx={{ fontSize: "30px" }} />
        </AddIconWrapper>
      </Wrapper>
    </Container>
  );
};

export default School;

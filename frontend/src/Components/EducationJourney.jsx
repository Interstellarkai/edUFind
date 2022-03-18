import styled from "styled-components";
import { Link } from "react-router-dom";
import PAGES from "../pageRoute";
import PrimarySchool from "./Images/PrimarySchool.jpg";
import SecondarySchool from "./Images/SecondarySchool.jpg";
import JuniorCollge from "./Images/JuniorCollge.png";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fff0d6;
  /* border: solid black; */
`;

const MessageContainer = styled.div`
  /* border: solid black; */
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  margin-top: 10%;
  overflow: auto;
`;

const Message = styled.div`
  /* border: solid black; */
  /* display: flex; */
  /* flex-direction: column; */
  margin-left: 20px;
`;

const MessageHead = styled.h1`
  /* flex: 1; */
  font-size: 50px;
  color: darkblue;
  margin-bottom: 20px;
  /* padding: 20px; */
`;

const MessageBody = styled.div`
  /* flex: 1; */
  font-size: 30px;
`;

const EducationLevelContainer = styled.div`
  flex: 1;
  /* border: black solid; */
  margin-top: 10%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Filter = styled.div`
  /* border: solid black; */
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1;
`;

const EducationLevelItem = styled.div`
  /* border: solid black; */
  position: relative;
  width: 50%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 0.5px solid black; */
  overflow: hidden;
  margin: 20px;
  border-radius: 5px;
  cursor: pointer;

  transition: all 0.3s ease;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 16px 24px;
    ${Filter} {
      opacity: 0.3;
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  text-decoration: none;
`;

const EducationLevelItemImage = styled.img`
  /* border: solid black; */
  position: absolute;
  height: 100%;
  width: 100%;
  min-height: 200px;
  object-fit: cover;
  z-index: 1;
`;

const EducationLevelItemText = styled.div`
  /* border: solid black; */
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  z-index: 3;
`;

const EducationJourney = () => {
  return (
    <Container>
      <MessageContainer>
        <Message>
          <MessageHead>Where are you in YOUR Education Journey?</MessageHead>
          <MessageBody>
            What's the next step in your studies?
            <br /> <br /> Making the decision on where to go next in your
            educational path is not easy.
            <br /> <br /> Allows us to help with that decision process
          </MessageBody>
        </Message>
      </MessageContainer>
      <EducationLevelContainer>
        <EducationLevelItem>
          <StyledLink to={PAGES.primarySchoolPage}>
            <EducationLevelItemImage src={PrimarySchool} />
            <Filter />
            <EducationLevelItemText>PRIMARY</EducationLevelItemText>
          </StyledLink>
        </EducationLevelItem>

        <EducationLevelItem>
          <StyledLink to={PAGES.secondarySchoolPage}>
            <EducationLevelItemImage src={SecondarySchool} />
            <Filter />
            <EducationLevelItemText>SECONDARY</EducationLevelItemText>
          </StyledLink>
        </EducationLevelItem>
        <EducationLevelItem>
          <StyledLink to={PAGES.jcSchoolPage}>
            <EducationLevelItemImage src={JuniorCollge} />
            <Filter />
            <EducationLevelItemText>JUNIOR COLLEGE</EducationLevelItemText>
          </StyledLink>
        </EducationLevelItem>
      </EducationLevelContainer>
    </Container>
  );
};

export default EducationJourney;

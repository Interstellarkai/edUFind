import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import ShortlistedSchools from "../Components/ShortlistedSchools";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #bcdfff;
  overflow-y: auto;
  /* overflow-x: hidden; */
`;

const WrapperContainer = styled.div`
  /* border: yellow solid; */
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 40px;
`;

const Subtitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
`;

const ViewMoreButton = styled(Link)`
  border: solid black;
  border-radius: 10px;
  border-width: 1px;
  text-decoration: none;
  background-color: #f5cb82;
  color: black;
  font-weight: bold;
  font-size: 15px;
  padding: 5px 20px;
  margin-top: 25px;
  cursor: pointer;
`;

const RecommendationsPage = () => {
  let eduLevel = useSelector((state) => state.user.value.educationLevel);
  eduLevel = eduLevel.replace(/ /gi, "_").toUpperCase();
  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <Title>Our Recommendations</Title>
        <Subtitle>These are some schools we think you might like! </Subtitle>
        <ShortlistedSchools />
        <ViewMoreButton to={"/" + eduLevel}>View More Schools</ViewMoreButton>
      </WrapperContainer>
    </Container>
  );
};

export default RecommendationsPage;
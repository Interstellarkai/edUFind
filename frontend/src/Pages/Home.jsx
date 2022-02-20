import styled from "styled-components";
import About from "../Components/About";
import EducationJourney from "../Components/EducationJourney";
import Navbar from "../Components/Navbar";

const Container = styled.div``;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <EducationJourney />
      <About />
    </Container>
  );
};

export default Home;

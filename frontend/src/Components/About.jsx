import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const Message = styled.div``;

const About = () => {
  return (
    <Container>
      <Title>About Us</Title>
      <Message>
        Our mission is to Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Corrupti, esse in ratione totam quasi optio quas nam tempore non
        laborum quo nostrum! Cum quo accusantium maiores, libero ullam
        perferendis delectus.
      </Message>
    </Container>
  );
};

export default About;

import { Checkbox, FormControlLabel } from "@mui/material";
import styled from "styled-components";
import Navbar from "../Components/Navbar";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #ffe7c3;
`;

const WrapperContainer = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: black solid; */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: solid blue; */
  height: 100%;
`;

const Title = styled.h1`
  font-size: 50px;
  color: #3838d1;
`;
const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 20px;
  /* background-color: white; */
  /* border: solid black; */
`;

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding-left: 20px;
  border: solid 0.5px lightgray;
`;

const ButtonContainer = styled.div`
  /* border: solid black; */
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  /* margin: 20px 0; */
  padding: 10px 20px;
  border: none;
  color: white;
  font-weight: 600;
  background-color: #5a5add;
  cursor: pointer;
`;

const RegistrationInterests = () => {
  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <Wrapper>
          <Title>What Are Your Interests?</Title>

          <Form>
            <FormItemContainer>
              <FormControlLabel
                control={<Checkbox />}
                label="Performing Arts"
              />
              <FormControlLabel control={<Checkbox />} label="Sports" />
              <FormControlLabel
                control={<Checkbox />}
                label="Clubs and Societies"
              />
              <FormControlLabel control={<Checkbox />} label="Others" />
            </FormItemContainer>
            <ButtonContainer>
              <Button>Submit</Button>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </WrapperContainer>
    </Container>
  );
};

export default RegistrationInterests;

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
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const Label = styled.label`
  margin: 10px 0;
`;
const Input = styled.input`
  padding: 10px;
  font-weight: 600;

  font-family: ${(props) =>
    props.type === "password" && "Verdana, Geneva, Tahoma, sans-serif"};

  letter-spacing: ${(props) => props.type === "password" && "0.125em"};
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

const Select = styled.select`
  /* font-weight: bold; */
  /* /* margin: 10px 0; */
  padding: 10px 5px;
  cursor: pointer;
`;

const Option = styled.option``;

const RegistrationBasicInfo = () => {
  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <Wrapper>
          <Title>Get Started on Your School Exploring Journey!</Title>

          <Form>
            <Label>Name</Label>
            <Input />

            <Label>Email</Label>
            <Input />

            <Label>Password</Label>
            <Input type="password" />

            <Label>Confirm Password</Label>
            <Input type="password" />

            <Label>Gender</Label>
            <Select>
              <Option>Male</Option>
              <Option>Female</Option>
              <Option selected>-</Option>
            </Select>
            <ButtonContainer>
              <Button>Next</Button>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </WrapperContainer>
    </Container>
  );
};

export default RegistrationBasicInfo;

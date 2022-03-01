import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import { publicRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #ffe7c3;
`;

const WrapperContainer = styled.div`
  /* height: 80%; */
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
  /* height: 100%; */
  padding-top: 30px;
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
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfrimPassword] = useState("");
  // const [gender, setGender] = useState("");

  const [user, setUser] = useState({
    username: "qeweq",
        password: "qeqwe",
        email: "kll@gmail.com",
        gender : null,
        motherTongueLanguage : null,
        educationLevel : null,
        region : null,
        ccaInterest : null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    // send to server
    e.preventDefault();
    try {
      console.log("Sending: ");
      console.log(user)
      const res = await publicRequest.post("/users/signup", user);
      console.log("Data: ");
      console.log(res.data);
      // If res valid, go next page
      // navigate("/register/2");

      // if (res) {
      // }
      // // else display error
      // else {
      // }
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
  };

  // console.log(user);

  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <Wrapper>
          <Title>Get Started on Your School Exploring Journey!</Title>

          <Form>
            <Label>Name</Label>
            <Input name="name" onChange={handleChange} />

            <Label>Email</Label>
            <Input name="email" onChange={handleChange} />

            <Label>Password</Label>
            <Input type="password" name="password" onChange={handleChange} />

            <Label>Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            />

            <Label>Gender</Label>
            <Select name="gender" onChange={handleChange}>
              <Option>Male</Option>
              <Option>Female</Option>
              <Option>Undefined</Option>
              <Option>Prefer not to say</Option>
            </Select>
            <ButtonContainer>
              <Button onClick={handleClick}>Next</Button>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </WrapperContainer>
    </Container>
  );
};

export default RegistrationBasicInfo;
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { publicRequest, SIGNUP } from "../requestMethod";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNewUserInfo } from "../redux/newUserRedux";
import PAGES from "../pageRoute";

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

const Span = styled.span`
  color: #eb0000;
  font-weight: 600;
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
  const [user, setUser] = useState({
    username: null,
    password: null,
    email: null,
    gender: "Male",
    motherTongueLanguage: null,
    educationLevel: null,
    region: null,
    ccaInterest: null,
    confirmPassword: null,
  });

  const [checks, setChecks, getChecks] = useState({
    wrongPassword: null,
    invalidEmail: null,
  });

  const navigate = useNavigate();
  const newUser = useSelector((state) => state.newUser);
  const dispatch = useDispatch();

  // Check confirm password
  const checkConfirmPass = (user) => {
    if (user.password === user.confirmPassword) {
      setChecks({ ...checks, wrongPassword: false });
    } else {
      setChecks({ ...checks, wrongPassword: true });
    }
  };

  // Renders most recent User Props
  useEffect(() => {
    // console.log("Updated User: ", user);
    checkConfirmPass(user);
  }, [user]);

  // Handle Input Change
  const handleChange = async (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check flag
    if (!checks.wrongPassword) {
      try {
        // const res = await publicRequest.post(SIGNUP, user);
        // const message = res.data.message
        const message = "Invalid Email";
        // Check response
        switch (message) {
          // Success
          case "success":
            dispatch(updateNewUserInfo(user));
            navigate(PAGES.registerPage2);
            break;

          case "Invalid Email":
            setChecks({ ...checks, invalidEmail: true });
            break;

          default:
            console.log("There was an error");
            break;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // console.log(user);

  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <Wrapper>
          <Title>Get Started on Your School Exploring Journey!</Title>

          <Form onSubmit={handleSubmit}>
            <Label>Name</Label>
            <Input required name="username" onChange={handleChange} />

            <Label>
              Email {checks.invalidEmail && <Span> EMAIL ALREADY IN USE!</Span>}
            </Label>
            <Input required name="email" onChange={handleChange} />

            <Label>Password</Label>
            <Input
              required
              type="password"
              name="password"
              onChange={handleChange}
            />

            <Label>
              Confirm Password
              {checks.wrongPassword && <Span> PASSWORD DIFFERENT!</Span>}
            </Label>
            <Input
              required
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
              <Button>Next</Button>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </WrapperContainer>
    </Container>
  );
};

export default RegistrationBasicInfo;

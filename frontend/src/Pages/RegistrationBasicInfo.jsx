import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNewUserInfo } from "../redux/newUserRedux";
import PAGES from "../pageRoute";
import { createNewUser } from "../redux/apiCalls";

const Container = styled.div`
  height: 100vh;
  /* width: 100vw; */
  // background-color: #ffe7c3;
  background-color: #004175;
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
  color: #FFFFFF;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const Label = styled.label`
  margin: 10px 0;
  color: #FFFFFF;
`;

const Span = styled.span`
  color: #eb0000;
  font-weight: 600;
  margin-left: 20px;
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
  // background-color: #5a5add;
  background-color: #19D1FF;
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
  const { isFetching, error, errorType, errorMessage } = useSelector(
    (state) => state.newUser.value
  );
  const [details, setDetails] = useState({
    username: null,
    password: null,
    email: null,
    gender: "Male",
    motherTongueLanguage: null,
    educationLevel: null,
    region: null,
    ccaInterests: null,
    confirmPassword: null,
  });

  const [checks, setChecks] = useState({
    wrongPassword: null,
    invalidEmail: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check confirm password
  const checkConfirmPass = (details) => {
    if (details.password === details.confirmPassword) {
      setChecks({ ...checks, wrongPassword: false });
    } else {
      setChecks({ ...checks, wrongPassword: true });
    }
  };

  // Renders most recent User Props
  useEffect(() => {
    // console.log("Updated User: ", user);
    checkConfirmPass(details);
  }, [details]);

  useEffect(() => {
    if (!error && error !== null) {
      // Reset Error else cannot access Register1 page
      dispatch(updateNewUserInfo({ error: null }));
      navigate(PAGES.registerPage2);
    }
  }, [error]);

  // Handle Input Change
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    console.log("Handle Submit Head: ", error);
    e.preventDefault();
    // Check flag
    if (!checks.wrongPassword) {
      try {
        const { confirmPassword, ...others } = details;
        createNewUser(dispatch, others);
      } catch (err) {
        console.log(err);
      }
    }
  };

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
              Email
              {(errorType === "RegisterAccountExist" ||
                errorType === "RegisterEmailRegex" ||
                errorType === "RegisterEmailLength") && (
                <Span> {errorMessage}</Span>
              )}
            </Label>
            <Input required name="email" onChange={handleChange} />

            <Label>
              Password
              {errorType === "RegisterPasswordLength" && (
                <Span> {errorMessage}</Span>
              )}
            </Label>
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
            {/* Set disabled when fetching */}
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

import { Checkbox, FormControlLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { newUserReset, updateNewUserInfo } from "../redux/newUserRedux";
import PAGES from "../pageRoute";
import { useEffect, useState } from "react";
import { setCurrentUser } from "../redux/userRedux";
import { login, updateUserDetails } from "../redux/apiCalls";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newUser = useSelector((state) => state.newUser.value);
  const currentUser = useSelector((state) => state.user.value);
  const [details, setDetails] = useState({
    ccaInterests: [],
  });

  useEffect(() => {
    console.log("Details: ", details);
    console.log("NewUser: ", newUser);
  }, [details]);

  // Handle Change
  const handleChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setDetails(({ ccaInterests }) => ({
        ccaInterests: [...ccaInterests, value],
      }));
    } else {
      setDetails(({ ccaInterests }) => ({
        ccaInterests: ccaInterests.filter((e) => e !== value),
      }));
    }
  };

  useEffect(() => {
    // call update userAccount
    if (currentUser.username !== false) {
      const { educationLevel, motherTongueLanguage, region, email, password } =
        newUser;
      updateUserDetails(dispatch, {
        ...currentUser,
        ...details,
        educationLevel,
        motherTongueLanguage,
        region,
      });
      dispatch(newUserReset());
      // Call login function here
      login(dispatch, { email, password });
      // navigate(PAGES.homePage);
    }
  }, [currentUser]);

  // Submit Action
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log user in to get UID
    const { email, password } = newUser;
    // Replace with a GET ID request
    login(dispatch, { email, password });
  };

  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <Wrapper>
          <Title>What Are Your Interests?</Title>
          <Form onSubmit={handleSubmit}>
            <FormItemContainer>
              <FormControlLabel
                control={<Checkbox />}
                label="Performing Arts"
                value="Performing Arts"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Sports"
                value="Sports"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Clubs and Societies"
                value="Clubs and Societies"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Others"
                value="Others"
                onChange={handleChange}
              />
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

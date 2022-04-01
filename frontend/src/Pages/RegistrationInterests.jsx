import { Checkbox, FormControlLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { updateUserDetails } from "../redux/apiCalls";
import { publicRequest, LOGIN } from "../requestMethod";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
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
  margin-top: 10%;
`;

const Title = styled.h1`
  font-size: 50px;
  // color: #3838d1;
  color: #FFFFFF;
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
  // background-color: #5a5add;
  background-color: #19D1FF;
  cursor: pointer;
`;

const RegistrationInterests = () => {
  const dispatch = useDispatch();
  const newUser = useSelector((state) => state.newUser.value);
  const [details, setDetails] = useState({
    ccaInterests: [],
  });
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

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
    if (userId !== "") {
      console.log("In Effect UID: ", userId);
      console.log("In Effect Token: ", token);
      // // Get rid of unwanted variables
      const { error, errorMessage, errorType, isFetching, ...others } = newUser;
      try {
        updateUserDetails(dispatch, {
          ...others,
          ...details,
          userId,
          token,
        });
        // dispatch(newUserReset());
        // Call login function here
        // login(dispatch, { email: others.email, password: others.password });
        // navigate(PAGES.homePage);
      } catch (err) {
        console.log(err);
      }
    }
  }, [token]);

  // Submit Action
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Log user in to get UID
    const { email, password } = newUser;
    try {
      const res = await publicRequest.post(LOGIN, {
        email,
        password,
      });
      setUserId(res.data.user._id);
      setToken(res.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(newUser);

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
                label="Visual and Performing Arts"
                value="Visual and Performing Arts"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Physical Sports"
                value="Physical Sports"
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

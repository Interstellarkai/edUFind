import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../redux/apiCalls";
import { useEffect, useState } from "react";
import { resetError, updateAccFailure } from "../redux/userRedux";

const Container = styled.div`
  /* height: 100vh; */
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
  /* align-items: center; */
  justify-content: center;
  /* border: solid blue; */
  height: 100%;
`;

const Header1 = styled.h1`
  font-size: 48px;
  color: #264e70;
`;

const Header2 = styled.h2`
  font-size: 18px;
  color: #000000;
`;
const CcaItem = styled.li``;

const SpanContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const Button = styled.button`
  width: 20%;
  margin: 20px 0;
  padding: 5px;
  border: none;
  color: white;
  font-weight: 600;
  background-color: #5a5add;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 10px;
  font-weight: 600;

  font-family: ${(props) =>
    props.type === "password" && "Verdana, Geneva, Tahoma, sans-serif"};

  letter-spacing: ${(props) => props.type === "password" && "0.125em"};
`;

const Span = styled.span`
  color: red;
  font-weight: 600;
  margin-left: 20px;
`;

const UserAccountPage = () => {
  const [newDetails, setnewDetails] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const currentUser = useSelector((state) => state.user.value);
  const currentUserError = useSelector((state) => state.user.error);
  const [passMismatch, setPassMismatch] = useState(false);
  const dispatch = useDispatch();

  // newDetails UseEffect
  useEffect(() => {
    console.log("New Details ", newDetails);
    console.log(currentUser);
  }, [newDetails]);

  // passwords UseEffect
  useEffect(() => {
    if (!passMismatch && !currentUserError.error) {
      updateUserDetails(dispatch, {
        ...currentUser,
        password: newDetails.newPassword,
      });
    } else {
      console.log("ERRORS: ", passMismatch, currentUserError.error);
    }
  }, [passMismatch, currentUserError]);

  // currentUser UseEffect
  useEffect(() => {
    if (!passMismatch && !currentUserError.error) {
      console.log("SUCCESS!");
    }
  }, [currentUser]);

  // Check Cfm and New Password
  const checkMismatch = () => {
    if (newDetails.newPassword !== newDetails.confirmNewPassword) {
      setPassMismatch(true);
    } else {
      setPassMismatch(false);
    }
  };

  // Check if old password
  const checkPass = () => {
    if (newDetails.password === currentUser.password) {
      dispatch(resetError());
    } else {
      dispatch(
        updateAccFailure({
          errorType: "WrongPassword",
          message: "Invalid Password Entered!",
        })
      );
    }
    checkMismatch();
  };

  const handleChange = (e) => {
    setnewDetails({ ...newDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check password
    checkPass();
  };
  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <Wrapper>
          <Header1>Basic User Information</Header1>
          <Header2>Name: {currentUser.username}</Header2>
          <Header2>Gender: {currentUser.gender}</Header2>
          <Header2>Region: {currentUser.region}</Header2>
          <Header2>Level of Education: {currentUser.educationLevel}</Header2>
          <Header2>
            Mother Tongue Language: {currentUser.motherTongueLanguage}
          </Header2>

          <Header1>Your Interests</Header1>
          <Header2>Co-Curricular Activities (CCAs)</Header2>
          {/* For each CCA Interst in Array - Render*/}
          {currentUser.ccaInterests.map((cca) => (
            <CcaItem key={cca}> {cca}</CcaItem>
          ))}

          <Header1>Account Information</Header1>
          <Header2>Email: {currentUser.email}</Header2>
          <Form onSubmit={handleSubmit}>
            {/* The current password will be checked against what's stored in the database, sort of an authorization to allow changing of pswd */}
            <SpanContainer>
              <Label>Enter Current Password: </Label>
              {currentUserError.error && (
                <Span>{currentUserError.message}</Span>
              )}
            </SpanContainer>
            <Input
              type="password"
              placeholder="Current Password"
              name="password"
              onChange={handleChange}
            />
            <Label>New Password: </Label>
            <Input
              type="password"
              placeholder="Enter New Password"
              name="newPassword"
              onChange={handleChange}
            />
            <SpanContainer>
              <Label>Confirm New Password: </Label>{" "}
              {passMismatch && <Span>Password Mismatch!</Span>}
            </SpanContainer>
            <Input
              type="password"
              placeholder="Re-enter New Password"
              name="confirmNewPassword"
              onChange={handleChange}
            />
            {/* If the input in new password and confirm new password match, the new password is updated in the database */}

            <Button>Save Changes</Button>
          </Form>
        </Wrapper>
      </WrapperContainer>
    </Container>
  );
};

export default UserAccountPage;

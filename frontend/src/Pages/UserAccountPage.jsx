import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { login, updateUserDetails } from "../redux/apiCalls";
import { useEffect, useState } from "react";
import { resetError, updateAccFailure } from "../redux/userRedux";
import { GETUID, publicRequest } from "../requestMethod";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Container = styled.div`
  /* height: 100vh; */
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
  /* align-items: center; */
  justify-content: center;
  /* border: solid blue; */
  height: 100%;
`;

const Header1 = styled.h1`
  font-size: 48px;
  // color: #264e70;
  color: #FFFFFF;
`;

const Header2 = styled.h2`
  font-size: 18px;
  // color: #000000;
  color: #FFFFFF;
`;
const CcaItem = styled.li``;

const SpanContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
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

const FormFooterContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  width: 20%;
  margin: 20px 10px 20px 0;
  padding: 5px;
  border: none;
  color: white;
  font-weight: 600;
  background-color: #5a5add;
  cursor: pointer;
`;

const Span = styled.span`
  color: red;
  font-weight: 600;
  margin-left: 20px;
`;

const SuccessContainer = styled.div`
  display: flex;
  align-items: center;
  color: #4bb543;
`;

const UserAccountPage = () => {
  const [newDetails, setnewDetails] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const currentUser = useSelector((state) => state.user.value);
  const currentUserError = useSelector((state) => state.user.error);
  const [passMismatch, setPassMismatch] = useState(null);
  const [changePass, setChangePass] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const dispatch = useDispatch();

  // newDetails UseEffect
  useEffect(() => {}, [newDetails]);

  // passwords UseEffect
  useEffect(() => {
    if (passMismatch !== null && !passMismatch && !currentUserError.error) {
      console.log("No errors");
      updateUserDetails(dispatch, {
        ...currentUser,
        password: newDetails.newPassword,
      });
      setChangePass(true);
    } else {
      console.log("ERRORS: ", passMismatch, currentUserError.error);
    }
  }, [passMismatch, currentUserError]);

  // currentUser UseEffect - Update User Details
  useEffect(() => {
    if (changePass) {
      console.log("SUCCESS!");
      login(dispatch, {
        email: currentUser.email,
        password: newDetails.newPassword,
      });
      setShowChangePass(true);
      setChangePass(false);
      setPassMismatch(null);
    }
  }, [changePass]);

  // Check Cfm and New Password
  const checkMismatch = () => {
    if (newDetails.newPassword !== newDetails.confirmNewPassword) {
      setPassMismatch(true);
      setShowChangePass(false);
    } else {
      setPassMismatch(false);
    }
  };

  // Check if old password
  const checkPass = async () => {
    // console.log(newDetails.password);
    const res = await publicRequest.post(
      GETUID,
      {
        email: currentUser.email,
        password: newDetails.password,
      },
      { headers: { authorization: currentUser.token } }
    );
    const success = res.data.success;
    if (success) {
      dispatch(resetError());
    } else {
      dispatch(
        updateAccFailure({
          errorType: "WrongPassword",
          message: "Invalid Password Entered!",
        })
      );
      setShowChangePass(false);
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
            <FormFooterContainer>
              <Button>Save Changes</Button>{" "}
              <Span>
                {showChangePass && (
                  <SuccessContainer>
                    Password Changed{" "}
                    <CheckCircleIcon sx={{ marginLeft: "10px" }} />
                  </SuccessContainer>
                )}
              </Span>
            </FormFooterContainer>
          </Form>
        </Wrapper>
      </WrapperContainer>
    </Container>
  );
};

export default UserAccountPage;

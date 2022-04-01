import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import PAGES from "../pageRoute";
import { useDispatch, useSelector } from "react-redux";
import { login, updateUserDetails } from "../redux/apiCalls";

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
  /* align-items: center; */
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
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  margin: 20px 0;
  color: #FFFFFF;
`;
const Input = styled.input`
  padding: 10px;
  font-weight: 600;

  font-family: ${(props) =>
    props.type === "password" && "Verdana, Geneva, Tahoma, sans-serif"};

  letter-spacing: ${(props) => props.type === "password" && "0.125em"};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 20%;
  margin: 20px 0;
  padding: 5px;
  border: none;
  color: white;
  font-weight: 600;
  // background-color: #5a5add;
  background-color: #19D1FF;
  cursor: pointer;
`;

const Span = styled.span`
  margin-left: 20px;
  color: red;
  font-weight: 600;
`;

const Subtitle = styled.div`
    color: #FFFFFF;
`;
// const  = styled.a`
//   color: #5a5add;
//   /* text-decoration: underline; */
//   cursor: pointer;
//   padding-left: 5px;
//   font-weight: 600;
// `;

const StyledLink = styled(Link)`
  color: #19D1FF;
  text-decoration: none;
  cursor: pointer;
  padding-left: 5px;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  // const [loginError, setloginError] = useState(null);

  const currentUser = useSelector((state) => state.user.value);
  const currentUserError = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(currentUser);
  }, [loginDetails, currentUser, currentUserError]);

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, loginDetails);
  };

  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <Wrapper>
          <Title>Login to edUFind</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Xyz@gmail.com"
              onChange={handleChange}
            />
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              onChange={handleChange}
            />
            <ButtonContainer>
              <Button>LOGIN</Button>
              {currentUserError.error && <Span>INVALID EMAIL/PASSWORD</Span>}
            </ButtonContainer>
          </Form>
          <Subtitle>
            Not a member yet?
            <StyledLink to={PAGES.registerPage1}>Sign up here!</StyledLink>
          </Subtitle>
        </Wrapper>
      </WrapperContainer>
    </Container>
  );
};

export default Login;

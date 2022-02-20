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
  /* align-items: center; */
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
const Subtitle = styled.div``;
const Link = styled.a`
  color: #5a5add;
  /* text-decoration: underline; */
  cursor: pointer;
  padding-left: 5px;
  font-weight: 600;
`;

const Login = () => {
  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <Wrapper>
          <Title>Login to edUFind</Title>

          <Form>
            <Label>EMAIL</Label>
            <Input placeholder="Xyz@gmail.com" />

            <Label>PASSWORD</Label>
            <Input
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
            />

            <Button>LOGIN</Button>
          </Form>

          <Subtitle>
            Not a member yet?
            <Link>Sign up here!</Link>
          </Subtitle>
        </Wrapper>
      </WrapperContainer>
    </Container>
  );
};

export default Login;

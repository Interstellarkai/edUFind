import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
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
  margin-top: 10%;
`;

const Title = styled.h1`
  font-size: 50px;
  color: #3838d1;
`;
const Form = styled.form`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* border: solid blue; */
  display: flex;
  flex-direction: column;
  width: 80%;
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

const SelectContainer = styled.div`
  margin: 20px 0;
  width: 100%;
  /* border: solid black; */
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 5px;
  cursor: pointer;
`;
const Option = styled.option`
  /* margin-top: 50px; */
`;

const RegistrationMoreDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    region: null,
    educationLevel: null,
    motherTongueLanguage: null,
  });

  useEffect(() => {
    // console.log("Details: ", details);
  }, [details]);

  // Handle Change
  const handleChange = (e) => {
    e.preventDefault();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  // Submit Action
  const handleSubmit = (e) => {
    // Send again?
    e.preventDefault();
    dispatch(updateNewUserInfo(details));
    navigate(PAGES.registerPage3);
  };

  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <Wrapper>
          <Title>Let's get a few more details!</Title>

          <Form onSubmit={handleSubmit}>
            <SelectContainer>
              <Select
                defaultValue="Region"
                onChange={handleChange}
                name="region"
              >
                <Option disabled>Region</Option>
                <Option>North</Option>
                <Option>East</Option>
                <Option>South</Option>
                <Option>West</Option>
              </Select>
            </SelectContainer>

            <SelectContainer>
              <Select
                defaultValue="Level Of Education"
                onChange={handleChange}
                name="educationLevel"
              >
                <Option disabled>Level Of Education</Option>
                <Option>Primary</Option>
                <Option>Secondary</Option>
                <Option>Junior College</Option>
              </Select>
            </SelectContainer>

            <SelectContainer>
              <Select
                defaultValue="Mother Tongue Language"
                onChange={handleChange}
                name="motherTongueLanguage"
              >
                <Option disabled>Mother Tongue Language</Option>
                <Option>Chinese</Option>
                <Option>Malay</Option>
                <Option>Tamil</Option>
                <Option>Others</Option>
              </Select>
            </SelectContainer>
            <ButtonContainer>
              <Button>Next</Button>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </WrapperContainer>
    </Container>
  );
};

export default RegistrationMoreDetails;

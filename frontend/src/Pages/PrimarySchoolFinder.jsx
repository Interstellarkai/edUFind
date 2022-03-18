import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Schools from "../Components/Schools";

const Container = styled.div`
  /* height: 100vh; */
  width: 100vw;
  overflow-y: auto;
  height: 100vh;
  background-color: #bcdfff;
`;

const WrapperContainer = styled.div`
  height: 80%;
  width: 54%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  padding-top: 25px;
  font-size: 45px;
  font-weight: 700;
  text-align: center;
  color: #000000;
`;

const WrapperTitle = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Subtitle = styled.p`
  padding-top: 10px;
  padding-bottom: 25px;
  font-weight: 700;
  text-align: center;
  font-size: 15px;
`;

const WrapperSearch = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  /* border: solid green; */
  align-items: center;
  justify-content: center;
`;

const Select = styled.select`
  flex: 2;
  height: 100%;
  border: none;
  /* padding: 10px; */
  text-align: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
`;

const Option = styled.option``;

const Input = styled.input`
  flex: 6;
  height: 100%;
  padding-left: 10px;
  /* border: 1px solid #4383be; */
  border: solid lightgray 0.5px;
`;

const Button = styled.button`
  flex: 1;
  height: 100%;
  border: none;
  height: 100%;
  background-color: teal;
  font-size: 15px;
  border: 1px solid #4383be;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

const SubContainer = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  padding: 20px 0px;
  width: 30%;
  display: flex;
  justify-content: left;
  flex-direction: column;
  /* border: 1px solid teal; */
`;

const SidebarHeader = styled.h3`
  font-weight: 700;
  font-size: 20px;
`;

const SidebarElement = styled.p`
  padding-top: 10px;
  font-size: 18px;
`;

const SidebarElementBr = styled.br`
  display: block;
  content: "";
  margin-top: 10px;
`;

const SidebarDropdown = styled.select`
  border: none;
  padding: 5px;
  display: flex;
  height: fit-content;
  width: 85%;
  cursor: pointer;
  font-size: 15px;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: normal;
`;

const PrimarySchoolFinder = () => {
  const [query, setQuery] = useState("");
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true);
    // console.log("clicked");
  };

  return (
    <Container>
      <Navbar />
      <WrapperContainer>
        <WrapperTitle>
          <Title>Primary School</Title>
          <Subtitle>
            Find School that match your interest and preferred locations
          </Subtitle>
          <WrapperSearch>
            <Select>
              <Option>Primary</Option>
              <Option>Secondary</Option>
              <Option>Junior College</Option>
            </Select>

            <Input
              placeholder="Search Schools"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button onClick={handleClick}>Search</Button>
          </WrapperSearch>
        </WrapperTitle>

        <SubContainer>
          <Sidebar>
            <SidebarHeader>What are your interest?</SidebarHeader>
            <SidebarElement>Co-Curricular Activities</SidebarElement>
            {/* Spacing between elements */}
            <SidebarElementBr />
            <SidebarDropdown>
              <Option value="" disabled selected hidden>
                Category
              </Option>
              <Option>Category 1</Option>
              <Option>Category 2</Option>
            </SidebarDropdown>
            <SidebarElementBr />
            <SidebarDropdown>
              <Option value="" disabled selected hidden>
                Specific CCAs
              </Option>
              <Option>CCA 1</Option>
              <Option>CCA 2</Option>
            </SidebarDropdown>
            <SidebarElement>Academic Interests</SidebarElement>
            <SidebarElementBr />
            <SidebarDropdown>
              <Option value="" disabled selected hidden>
                Subjects Offered
              </Option>
              <Option>Subject 1</Option>
              <Option>Subject 2</Option>
            </SidebarDropdown>
            <SidebarElementBr />
            <SidebarDropdown>
              <Option value="" disabled selected hidden>
                Mother Tongue Languages Offered
              </Option>
              <Option>MTL 1</Option>
              <Option>MTL 2</Option>
            </SidebarDropdown>
            <SidebarElementBr />
            <SidebarDropdown>
              <Option value="" disabled selected hidden>
                Elective Programmes
              </Option>
              <Option>EP 1</Option>
              <Option>EP 2</Option>
            </SidebarDropdown>
            <SidebarElementBr />
            <SidebarElement>Location</SidebarElement>
            <SidebarElementBr />
            <SidebarDropdown>
              <Option value="" disabled selected hidden>
                Region/Area
              </Option>
              <Option>Region 1</Option>
              <Option>Region 2</Option>
            </SidebarDropdown>
          </Sidebar>

          <Schools query={query} click={click} />
        </SubContainer>
      </WrapperContainer>
    </Container>
  );
};

export default PrimarySchoolFinder;

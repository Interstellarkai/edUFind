import styled from "styled-components";
import Navbar from "../Components/Navbar";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #bcdfff;
`;

const WrapperContainer = styled.div`
  height: 80%;
  width: 60%;
  margin: auto;
  display: flex;
  flex-direction: column;
  /* border: black solid; */
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

const Select = styled.select`
  width: 20%;
  border: none;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
`;

const Option = styled.option``;

const SearchBar = styled.div`
  flex: 1;
  width: 100%;
  /* border: solid black; */
  margin: 1px;
`;

const Input = styled.input`
  width: 80%;
  height: 100%;
  /* border: 1px solid teal; */
  border: 1px solid #4383be;
  padding: 10px;
`;

const Button = styled.button`
  border: none;
  height: 100%;
  background-color: teal;
  /* border: 1px solid teal; */
  border: 1px solid #4383be;
  color: white;
  padding: 10px;
  cursor: pointer;
`;

const WrapperSearch = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const SubContainer = styled.div`
  display: flex;
  /* border: black solid; */
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

const Schools = styled.div`
  padding-top: 25px;
  display: flex;
  width: 100%;
  /* border: black solid; */
  flex-direction: column;
  align-items: center;
`;

const WrapperSchoolAddress = styled.div`
  margin-top: 5px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  height: 90%;
  /* border: solid black; */
`;

const WrapperSchoolDetails = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  /* border: solid black; */
`;

const SchoolElement = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 23%;
  background-color: white;
`;

const SchoolName = styled.h1`
  padding-top: 5px;
  font-size: 25px;
  font-weight: 700;
  /* border: 1px solid teal; */
`;

const SchoolAddress = styled.p`
  padding-top: 5px;
  padding-inline: 15px;
  font-size: 15px;
`;

const AddSchoolButton = styled.button`
  margin-inline-start: auto;
  border: none;
  background-color: teal;
  /* border: 1px solid teal; */
  color: white;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
`;

const PrimarySchoolFinder = () => {
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
            <SearchBar>
              <Input placeholder="Search Schools" />
              <Button>Search</Button>
            </SearchBar>
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
          <Schools>
            <SchoolElement>
              <WrapperSchoolDetails>
                <WrapperSchoolAddress>
                  <SchoolName>Primary School #1</SchoolName>
                  <SchoolAddress>123 Address Street 234</SchoolAddress>
                </WrapperSchoolAddress>
                <AddSchoolButton>Add</AddSchoolButton>
              </WrapperSchoolDetails>
            </SchoolElement>
            <br />
            <SchoolElement>
              <WrapperSchoolDetails>
                <WrapperSchoolAddress>
                  <SchoolName>
                    Primary School #2313123123123123121312312312
                  </SchoolName>
                  <SchoolAddress>123 Address Street 234</SchoolAddress>
                </WrapperSchoolAddress>
                <AddSchoolButton>Add</AddSchoolButton>
              </WrapperSchoolDetails>
            </SchoolElement>
          </Schools>
        </SubContainer>
      </WrapperContainer>
    </Container>
  );
};

export default PrimarySchoolFinder;

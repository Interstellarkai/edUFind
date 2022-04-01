import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Schools from "../Components/Schools";
import { useDispatch, useSelector } from "react-redux";
import { setClick } from "../redux/searchButtonRedux";
import { ccaGenericData } from "../ccaGeneric";

const Container = styled.div`
  /* height: 100vh; */
  width: 100vw;
  overflow-y: auto;
  height: 100vh;
  background-color: #bcdfff;
  /* background-color: #bcdfff; */
  /* background-color: #${(props) =>
    props.mlc === "PRIMARY"
      ? "b7d7e8"
      : props.mlc === "SECONDARY"
      ? "fff222"
      : "f0f0f0"}; */
`;

const WrapperContainer = styled.div`
  height: 80%;
  width: 70%;
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
  /* text-shadow: 1px 1px 1px; */
`;

const WrapperTitle = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* border: solid green; */
`;

const Subtitle = styled.p`
  padding-top: 10px;
  padding-bottom: 25px;
  font-weight: 700;
  text-align: center;
  font-size: 20px;
  color: #1b1b1b;
`;

const WrapperSearch = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  /* border: solid green; */
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
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
  margin-right: -20px;
  border: solid lightgray;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  border: solid black 2px;
  border-right: none;
  -webkit-mask-image: radial-gradient(circle at right, black 41px);
  box-shadow: rgba(0, 0, 0.2, 0.2) 2px 3px 3px;
  &:hover {
    border: solid 0.5px;
    box-shadow: 0 0 10px #9ecaed;
    background-color: #f8faff;
  }
`;

const Option = styled.option`
  background-color: white;
`;

const Input = styled.input`
  flex: 6;
  height: 100%;
  padding-left: 10px;
  /* border: 1px solid #4383be; */
  border: solid black 2px;
  border-radius: 45px;
  box-shadow: rgba(0, 0, 0.2, 0.2) 2px 3px 3px;
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
  justify-content: center;
  /* border: solid green; */
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
  font-size: 22px;
  text-shadow: 0.2px 0.2px 0.2px;
`;

const SidebarElement = styled.p`
  padding-top: 10px;
  font-size: 19px;
`;

const SidebarElementBr = styled.br`
  display: block;
  content: "";
  margin-top: 10px;
`;

const SidebarDropdown = styled.select`
  border: none;
  padding: 10px;
  display: flex;
  height: fit-content;
  width: 85%;
  cursor: pointer;
  font-size: 16px;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: normal;
  border: 0.5px solid grey;
  border-radius: 10px;
  box-shadow: 0.5px 0.5px 4px;
  &:hover {
    border: solid 0.5px;
    box-shadow: 0 0 10px #9ecaed;
  }
`;

const PrimarySchoolFinder = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    Category: "",
    CCA: "",
    subjectsOffered: "",
    motherTongue: "",
    ElectiveProgrammes: "",
    Region: "",
  });
  const click = useSelector((state) => state.searchButton.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setClick());
    console.log(click);
  };

  const [mlc, setMlc] = useState(window.location.href.split("/")[3]);

  useEffect(() => {
    if (window.location.href.split("/")[3] === "JUNIOR_COLLEGE") {
      setMlc("JUNIOR COLLEGE");
    }
  }, []);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const handleFilter = (e) => {
    e.preventDefault();
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // console.log(mlc);

  return (
    <Container mlc={mlc}>
      <Navbar />
      <WrapperContainer>
        <WrapperTitle>
          <Title>
            {mlc === "JUNIOR COLLEGE"
              ? "JUNIOR COLLEGE"
              : mlc === "CENTRALISED INSTITUTE"
              ? "CENTRALISED INSTITUTE"
              : mlc + " SCHOOLS"}
          </Title>
          <Subtitle>
            Find School that match your interest and preferred locations
          </Subtitle>
          <WrapperSearch>
            <Select value={mlc} onChange={(e) => setMlc(e.target.value)}>
              <Option value="PRIMARY">Primary</Option>
              <Option value="SECONDARY">Secondary</Option>
              <Option value="JUNIOR COLLEGE">Junior College</Option>
              <Option value="MIXED LEVELS">Mixed Levels</Option>
              <Option value="CENTRALISED INSTITUTE">
                Centralised Institute
              </Option>
            </Select>
            <Input
              placeholder="Search Schools"
              onChange={(event) => setQuery(event.target.value)}
            />
          </WrapperSearch>
        </WrapperTitle>

        <SubContainer>
          <Sidebar>
            <SidebarHeader>What are your interest?</SidebarHeader>
            <SidebarElement>Co-Curricular Activities</SidebarElement>
            {/* Spacing between elements */}
            <SidebarDropdown
              name="Category"
              value={filters.Category}
              onChange={handleFilter}
            >
              <Option value="">All Categories</Option>
              <Option value="PHYSICAL SPORTS"> Physical sports</Option>
              <Option value="VISUAL AND PERFORMING ARTS">
                Visual and performing arts
              </Option>
              <Option value="CLUBS AND SOCIETIES">Clubs and Societies</Option>
              <Option value="UNIFORMED GROUPS">Uniformed groups</Option>
              <Option value="OTHERS"> Others</Option>
            </SidebarDropdown>
            <SidebarElementBr />
            <SidebarElementBr />
            <SidebarDropdown
              name="CCA"
              value={filters.CCA}
              onChange={handleFilter}
            >
              <Option value="" selected>
                CCA
              </Option>
              {Object.entries(ccaGenericData).map(([key, item]) => (
                <Option value={key}>{item}</Option>
              ))}
              {/* <Option value="" disabled selected hidden>
                Specific CCAs
              </Option>
              <Option>CCA 1</Option>
              <Option>CCA 2</Option> */}
            </SidebarDropdown>
            <SidebarElementBr />
            <SidebarElement>Academic Interests</SidebarElement>
            <SidebarDropdown
              name="subjectsOffered"
              value={filters.subjectsOffered}
              onChange={handleFilter}
            >
              <Option value="">All Subjects</Option>
              <Option value="ART">Art</Option>
              <Option value="CHINESE">Chinese</Option>
              <Option value="CHINESE B">Chinese B</Option>
              <Option value="CO-CURRICULAR ACTIVITIES">
                Co-Curricular Activities
              </Option>
              <Option value="DESIGN %26 TECHNOLOGY">Design & Technology</Option>
              <Option value="ENGLISH LANGUAGE">English Language</Option>
              <Option value="FOOD AND CONSUMER EDUCATION">
                Food and Consumer Education
              </Option>
              <Option value="FOUNDATION BENGALI">Foundation Bengali</Option>
              <Option value="FOUNDATION CHINESE">Foundation Chinese</Option>
              <Option value="FOUNDATION ENGLISH LANGUAGE">
                Foundation English Language
              </Option>
              <Option value="FOUNDATION HINDI">Foundation Hindi</Option>
              <Option value="FOUNDATION MALAY">Foundation Malay</Option>
              <Option value="FOUNDATION TAMIL">Foundation Tamil</Option>
              <Option value="H1 ART">H1 Art</Option>
              <Option value="H1 BIOLOGY">H1 Biology</Option>
              <Option value="H1 CHEMISTRY">H1 Chemistry</Option>
              <Option value="H1 CHINESE LANGUAGE">H1 Chinese Language</Option>
              <Option value="H1 ECONOMICS">H1 Economics</Option>
              <Option value="H1 FRENCH LANGUAGE">H1 French Language</Option>
              <Option value="H1 GENERAL PAPER">H1 General Paper</Option>
              <Option value="H1 GERMAN LANGUAGE">H1 German Language</Option>
              <Option value="H1 HISTORY">H1 History</Option>
              <Option value="H1 JAPANESE LANGUAGE">H1 Japanese Language</Option>
              <Option value="H1 MALAY LANGUAGE">H1 Malay Language</Option>
              <Option value="H1 PHYSICS">H1 Physics</Option>
              <Option value="H1 PROJECT WORK">H1 Project Work</Option>
              <Option value="H1 TAMIL LANGUAGE">H1 Tamil Language</Option>
              <Option value="H2 ART">H2 Art</Option>
              <Option value="H2 BIOLOGY">H2 Biology</Option>
              <Option value="H2 CHEMISTRY">H2 Chemistry</Option>
              <Option value="H2 COMPUTING">H2 Computing</Option>
              <Option value="H2 ECONOMICS">H2 Economics</Option>
              <Option value="H2 FRENCH LANGUAGE">H2 French Language</Option>
              <Option value="H2 GERMAN LANGUAGE">H2 German Language</Option>
              <Option value="H2 HISTORY">H2 History</Option>
              <Option value="H2 JAPANESE LANGUAGE">H2 Japanese Language</Option>
              <Option value="H2 KNOWLEDGE %26 INQUIRY">
                H2 Knowledge & Inquiry
              </Option>
              <Option value="H2 MUSIC">H2 Music</Option>
              <Option value="H2 PHYSICS">H2 Physics</Option>
              <Option value="H2 TRANSLATION (CHINESE)">
                H2 Translation(Chinese)
              </Option>
              <Option value="H3 ART">H3 Art</Option>
              <Option value="H3 BIOLOGY">H3 Biology</Option>
              <Option value="H3 CHEMISTRY">H3 Chemistry</Option>
              <Option value="H3 ECONOMICS">H3 Economics</Option>
              <Option value="H3 HISTORY">H3 History</Option>
              <Option value="H3 MUSIC">H3 Music</Option>
              <Option value="H3 PHYSICS">H3 Physics</Option>
              <Option value="HIGHER CHINESE">Higher Chinese</Option>
              <Option value="HIGHER MALAY">Higher Malay</Option>
              <Option value="HIGHER TAMIL">Higher Tamil</Option>
              <Option value="INDIVIDUALISED STUDY OPTION">
                Individualised Study Option
              </Option>
              <Option value="MALAY">Malay</Option>
              <Option value="MALAY B">Malay B</Option>
              <Option value="MATHEMATICS">Mathematics</Option>
              <Option value="MUSIC">Music</Option>
              <Option value="NTU MOLECULAR BIOLOGY">
                Ntu Molecular Biology
              </Option>
              <Option value="NTU SEMICONDUCTOR PHYSICS %26 DEVICES">
                NTU Semiconductor Physics & Devices
              </Option>
              <Option value="NUS GEOPOLITICS: WAR %26 PEACE">
                NUS Geopolitics: War & Peace
              </Option>
              <Option value="PHYSICAL EDUCATION">Physical Education</Option>
              <Option value="SCIENCE">Science</Option>
              <Option value="SOCIAL STUDIES">Social Studies</Option>
              <Option value="TAMIL">Tamil</Option>
              <Option value="TAMIL B">Tamil B</Option>
            </SidebarDropdown>
            <SidebarElementBr />
            <SidebarElementBr />
            <SidebarDropdown
              name="motherTongue"
              value={filters.motherTongue}
              onChange={handleFilter}
            >
              <Option value="">All Mother Tongue Languages</Option>
              <Option value="Chinese">Chinese</Option>
              <Option value="Malay">Malay</Option>
              <Option value="Tamil">Tamil</Option>
            </SidebarDropdown>
            <SidebarElementBr />
            <SidebarElementBr />
            <SidebarDropdown
              disabled={
                (mlc === "JUNIOR COLLEGE" || mlc === "CENTRALISED INSTITUTE") &&
                true
              }
              name="ElectiveProgrammes"
              value={filters.ElectiveProgrammes}
              onChange={handleFilter}
            >
              <Option value="">All Elective Programmes</Option>
              <Option value="Community %26 Youth Leadership">
                Community & Youth Leadership
              </Option>
              <Option value="Community Involvement %26 Student Leadership">
                Community Involvement & Student Leadership
              </Option>
              <Option value="Community Service %26 Student Leadership">
                Community Service & Student Leadership
              </Option>
              <Option value="Music %26 Performing Arts">
                Music & Performing Arts
              </Option>
              <Option value="Music %26 Performing Arts/ Visual Arts & Design">
                Music & Performing Arts/ Visual Arts & Design
              </Option>
              <Option value="Music %26 Performing Arts / Visual Arts & Design">
                Music & Performing Arts / Visual Arts & Design
              </Option>
              <Option value="Sports %26 Outdoor Education">
                Sports & Outdoor Education
              </Option>
              <Option value="Visual %26 Performing Arts">
                Visual & Performing Arts
              </Option>
              <Option value="Visual Arts %26 Design">
                Visual Arts & Design
              </Option>
            </SidebarDropdown>
            <SidebarElementBr />
            <SidebarElement>Location</SidebarElement>
            <SidebarDropdown
              name="Region"
              value={filters.Region}
              onChange={handleFilter}
            >
              <Option value="">Region/Area</Option>
              <Option value="NORTH">North</Option>
              <Option value="SOUTH">South</Option>
              <Option value="EAST">East</Option>
              <Option value="WEST">West</Option>
            </SidebarDropdown>
          </Sidebar>

          <Schools query={query} click={click} mlc={mlc} filters={filters} />
        </SubContainer>
      </WrapperContainer>
    </Container>
  );
};

export default PrimarySchoolFinder;

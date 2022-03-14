import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import School from "../Components/School";

const Container = styled.div`
  background-color: #bcdfff;
  overflow-y: auto;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ResultsTitle = styled.h1`
  margin: 20px 0;
`;

const ResultsContainer = styled.div`
  width: 40%;
`;

const SearchResultPage = () => {
  const allSchools = useSelector((state) => state.schools.value);
  const searchQ = useSelector((state) => state.searchQ.value);

  useEffect(() => {}, [searchQ]);
  console.log(searchQ);
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ResultsTitle>Results</ResultsTitle>
        <ResultsContainer>
          {" "}
          {allSchools
            .filter((school) =>
              school.school_name.includes(searchQ.toUpperCase())
            )
            .map((school) => (
              <School sch={school} key={school._id} />
            ))}
        </ResultsContainer>
      </Wrapper>
    </Container>
  );
};

export default SearchResultPage;

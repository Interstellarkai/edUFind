import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GETALLSCHOOLS, publicRequest } from "../requestMethod";
import School from "./School";
// import { schools } from "../data";

const Container = styled.div`
  padding-top: 25px;
`;

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [mlc, setMlc] = useState(window.location.href.split("/")[3]);

  useEffect(() => {
    if (window.location.href.split("/")[3] === "JUNIOR_COLLEGE") {
      setMlc("JUNIOR COLLEGE");
    }
    const getSchools = async () => {
      try {
        const res = await publicRequest.get(
          GETALLSCHOOLS + "?mainlevel_code=" + mlc
        );
        setSchools(res.data.schools);
      } catch (err) {
        console.log(err);
      }
    };
    getSchools();
  }, [mlc]);

  console.log();

  return (
    <Container>
      {schools.map((sch) => (
        <School sch={sch} key={sch.id} />
      ))}
    </Container>
  );
};

export default Schools;

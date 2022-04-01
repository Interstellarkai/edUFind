import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { resetShortlistDelete } from "../redux/shortlistDeleteRedux";
import { GETSCHOOL, GETSHORTLISTED, publicRequest } from "../requestMethod";
import ShortlistedSchool from "./ShortlistedSchool";

const Container = styled.div`
  width: 100%;
  /* height: fit-content; */
  display: flex;
  /* flex-direction: row; */
  /* background-color: #bcdfff; */
  align-items: center;
  /* border: solid green; */
  justify-content: center;
  flex-wrap: wrap;
`;

const ShortlistedSchools = () => {
  const currentUser = useSelector((state) => state.user.value);
  const deleteState = useSelector((state) => state.shortlistDelete.value);
  const [shortlisted, setShortlisted] = useState([]);
  const [schools, setSchools] = useState([]);
  const dispatch = useDispatch();

  //   Get Shortlisted Data
  useEffect(() => {
    const getShortlisted = async () => {
      try {
        const tmpShortlist = [];
        setSchools([]);
        const res = await publicRequest.get(
          GETSHORTLISTED(currentUser.userId),
          { headers: { authorization: currentUser.token } }
        );
        const shortlistedArray = res.data.Shortlist.shortlisted;
        // console.log("Shortlsited Array:", shortlistedArray);
        // Save each school name on first render
        shortlistedArray.map((item) =>
          tmpShortlist.push({
            school_name: item.school_name,
            school_notes: item.school_notes,
            shortlist_id: item._id,
          })
        );
        setShortlisted([...tmpShortlist]);
        dispatch(resetShortlistDelete());
      } catch (err) {
        console.log(err);
      }
    };
    getShortlisted();
  }, [deleteState]);

  //   Get schools based on shortlisted data
  useEffect(() => {
    // console.log("Shortlisted: ", shortlisted);
    shortlisted.map(async (item) => {
      const res = await publicRequest.get(GETSCHOOL(item.school_name));
      setSchools((pre) => [
        ...new Map(
          [
            ...pre,
            {
              shortlist_id: item.shortlist_id,
              school_details: res.data.schools[0],
              school_notes: item.school_notes,
            },
          ].map((sch) => [sch.school_details.school_name, sch])
        ).values(),
      ]);
    });
  }, [shortlisted]);

  useEffect(() => {
    // console.log("UseEffect Schools: ", schools);
  }, [schools]);

  return (
    <Container>
      {console.log("Length: ", schools.length)}
      {schools.map((item) => (
        <ShortlistedSchool
          sch={item.school_details}
          notes={item.school_notes}
          id={item.shortlist_id}
          key={item.id}
        />
      ))}
    </Container>
  );
};

export default ShortlistedSchools;

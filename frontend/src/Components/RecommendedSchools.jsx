import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { resetShortlistAdd } from "../redux/shortlistAddRedux";
import { resetShortlistDelete } from "../redux/shortlistDeleteRedux";
import {
  FilterCcaGrp,
  GETALLSCHOOLS,
  GETSHORTLISTED,
  publicRequest,
} from "../requestMethod";
import RecommendedSchool from "./RecommendedSchool";

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

const RecommendedSchools = () => {
  const currentUser = useSelector((state) => state.user.value);
  const addShortlist = useSelector((state) => state.shortlistAdd.value);
  const deleteShortlist = useSelector((state) => state.shortlistDelete.value);
  const [shortlistedSchools, setShortlistedSchools] = useState([]);
  const [recommendedSchools, setRecommendedSchools] = useState([]);
  const dispatch = useDispatch();

  // mlc
  const mlc = currentUser.educationLevel.replace(/ /gi, "_").toUpperCase();

  // Random Selection
  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  // Get Recommended Schools
  const getIntersect = async () => {
    //Initialise Arrays
    let filterCcaCat = [];
    let filterMTL = [];
    let filterZone = [];

    // CCA Cat filter. For each CCA Grp interest
    // currentUser.ccaInterests.map(async (ccaGrp) => {
    //   Uppercase and get response
    if (currentUser.ccaInterests.length) {
      for (let i = 0; i < currentUser.ccaInterests.length; i++) {
        try {
          console.log(currentUser.ccaInterests[i]);
          let ccaCatRes = await publicRequest.get(
            FilterCcaGrp(currentUser.ccaInterests[i].toUpperCase())
          );

          ccaCatRes.data.CCAs.map((item) => {
            // Push if not included
            if (!filterCcaCat.includes(item.school_name)) {
              filterCcaCat.push(item.school_name);
            }
          });
        } catch (err) {
          console.log("ERROR");
        }
      }
    } else {
      filterCcaCat = null;
    }

    // });

    console.log("Filter CCA cat Array: ", filterCcaCat);

    // Get all schools
    try {
      const Schoolsres = await publicRequest.get(
        GETALLSCHOOLS + "?mainlevel_code=" + mlc
      );

      // MTL Filter Array
      let filterMTLData = Schoolsres.data.schools;
      if (
        currentUser.motherTongueLanguage !== "" &&
        currentUser.motherTongueLanguage !== null
      ) {
        filterMTLData = Schoolsres.data.schools.filter((item) => {
          return (
            item.mothertongue1_code.includes(
              currentUser.motherTongueLanguage
            ) ||
            item.mothertongue2_code.includes(
              currentUser.motherTongueLanguage
            ) ||
            item.mothertongue3_code.includes(currentUser.motherTongueLanguage)
          );
        });
      }

      // Zone Filter Array
      let filterZoneData = Schoolsres.data.schools;
      if (currentUser.region !== null && currentUser.region !== "") {
        filterZoneData = Schoolsres.data.schools.filter(
          (item) => item.zone_code === currentUser.region.toUpperCase()
        );
      }

      // CCA Filter Array

      // Map Array
      filterMTLData.map((item) => {
        filterMTL.push(item.school_name);
      });
      console.log("MTL Array: ", filterMTL);

      filterZoneData.map((item) => {
        filterZone.push(item.school_name);
      });
      console.log("Zone Array: ", filterZone);

      // Get inersection
      const filteredArray1 = filterZone.filter((value) =>
        filterMTL.includes(value)
      );
      console.log("Filter Array 1: ", filteredArray1);

      let filteredArray2 = [...filteredArray1];
      if (filterCcaCat !== null) {
        filteredArray2 = filteredArray1.filter((value) =>
          filterCcaCat.includes(value)
        );
      }
      console.log("Filter Array 2: ", filteredArray2);

      //Filter against whole list of schools
      const tmpArray = Schoolsres.data.schools.filter((item) =>
        filteredArray2.includes(item.school_name)
      );
      console.log("Tmp Array", tmpArray);
      setRecommendedSchools(getRandom(tmpArray, 9));
    } catch (err) {
      console.log("ERROR GETTING ALL SCHOOLS: ", err);
    }
  };

  // Get User's shortlisted schools
  useEffect(() => {
    dispatch(resetShortlistAdd());
    dispatch(resetShortlistDelete());
    const getShortlisted = async () => {
      try {
        const tmpShortlist = [];
        const res = await publicRequest.get(
          GETSHORTLISTED(currentUser.userId),
          {
            headers: { authorization: currentUser.token },
          }
        );
        const shortlistedArray = res.data.Shortlist.shortlisted;
        // Save each school name on first render
        shortlistedArray.map((item) =>
          tmpShortlist.push({
            shortlist_id: item._id,
            school_name: item.school_name,
          })
        );
        setShortlistedSchools(tmpShortlist);
      } catch (err) {
        console.log(err);
      }
    };
    getShortlisted();
  }, [addShortlist, deleteShortlist]);

  useEffect(() => {
    getIntersect();
  }, []);

  return (
    <Container>
      {/* {console.log("Length: ", schools.length)} */}
      {recommendedSchools.map((item) => (
        <RecommendedSchool
          sch={item}
          shortlistedSchools={shortlistedSchools}
          currentUser={currentUser}
          //   notes={item.school_notes}
        />
      ))}
    </Container>
  );
};

export default RecommendedSchools;

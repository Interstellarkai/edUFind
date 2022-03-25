import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  GETALLSCHOOLS,
  publicRequest,
  FilterCcaGrp,
  FilterSubject,
  FilterZone,
  FilterEP,
  GETSHORTLISTED,
} from "../requestMethod";
import School from "./School";
import ReactPaginate from "react-paginate";
import { resetShortlistAdd } from "../redux/shortlistAddRedux";
import { useSelector, useDispatch } from "react-redux";
import { resetShortlistDelete } from "../redux/shortlistDeleteRedux";

// import { schools } from "../data";

const Container = styled.div`
  padding-top: 25px;
  width: 60%;
`;

const Paginatecontainter = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
`;

const Schools = ({ query, click, mlc, filters }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [shortlistedSchools, setShortlistedSchools] = useState([]);
  const currentUser = useSelector((state) => state.user.value);
  const addShortlist = useSelector((state) => state.shortlistAdd.value);
  const deleteShortlist = useSelector((state) => state.shortlistDelete.value);
  const dispatch = useDispatch();

  const getIntersect = async (filters) => {
    //Initialise Arrays
    const filterCcaCat = [];
    const filterSubject = [];
    const filterMTL = [];
    const filterEP = [];
    const filterZone = [];
    const QueryArray = [];
    console.log("CAT: ", filters.Category);
    console.log("SUB: ", filters.subjectsOffered);

    try {
      // CCA Cat filter
      const ccaCatRes = await publicRequest.get(FilterCcaGrp(filters.Category));
      console.log("ccaCatRes", ccaCatRes);
      //Map Array
      ccaCatRes.data.CCAs.map((item) => {
        filterCcaCat.push(item.school_name);
      });

      // Subjects filter
      const subjectRes = await publicRequest.get(
        FilterSubject(filters.subjectsOffered)
      );
      //Map Array
      subjectRes.data.Subjects.map((item) => {
        filterSubject.push(item.school_name);
      });
      const filteredArray1 = filterCcaCat.filter((value) =>
        filterSubject.includes(value)
      );

      console.log("schools", schools);

      // Get schools MTL
      const Schoolsres = await publicRequest.get(
        GETALLSCHOOLS + "?mainlevel_code=" + mlc
      );

      // MTL filter
      const filterMTLData = Schoolsres.data.schools.filter((item) => {
        return (
          item.mothertongue1_code.includes(filters.motherTongue) ||
          item.mothertongue2_code.includes(filters.motherTongue) ||
          item.mothertongue3_code.includes(filters.motherTongue)
        );
      });
      //Map Array
      filterMTLData.map((item) => {
        filterMTL.push(item.school_name);
      });
      const filteredArray2 = filteredArray1.filter((value) =>
        filterMTL.includes(value)
      );

      // Elective Program filter
      const EPRes = await publicRequest.get(
        FilterEP(filters.ElectiveProgrammes)
      );
      console.log(EPRes);
      //Map Array
      EPRes.data.programmes.map((item) => {
        filterEP.push(item.school_name);
      });
      let filteredArray3 = [];
      if (mlc === "JUNIOR COLLEGE" || mlc === "CENTRALISED INSTITUTE") {
        filteredArray3 = [...filteredArray2];
        console.log("FA3:", filteredArray3);
      } else {
        filteredArray3 = filteredArray2.filter((value) =>
          filterEP.includes(value)
        );
      }

      // Zone filter
      const zoneRes = await publicRequest.get(FilterZone(filters.Region));
      console.log(zoneRes);
      //Map Array
      zoneRes.data.schools.map((item) => {
        filterZone.push(item.school_name);
      });

      const filteredArray4 = filteredArray3.filter((value) =>
        filterZone.includes(value)
      );

      // console.log("CCA: ", filterCcaCat);
      // console.log("SUBJECTS: ", filterSubject);
      // console.log("MTL: ", filterMTL);
      // console.log("EP: ", filterEP);
      // console.log("Zone: ", filterZone);
      // console.log("FILTERED1: ", filteredArray1);
      // console.log("FILTERED2: ", filteredArray2);
      // console.log("FILTERED3: ", filteredArray3);
      // console.log("FILTERED4: ", filteredArray4);

      //Filter against whole list of schools
      const tmpArray = Schoolsres.data.schools.filter((item) =>
        filteredArray4.includes(item.school_name)
      );
      console.log("Tmp Array", tmpArray);
      setSchools(tmpArray);
      // Filter against query

      if (query !== "") {
        const filterQuery = Schoolsres.data.schools.filter((school) => {
          return school.school_name.toUpperCase().includes(query.toUpperCase());
        });
        //Map Array
        filterQuery.map((item) => {
          QueryArray.push(item.school_name);
        });
        console.log("Finalfilter:", QueryArray);
        const filteredArray5 = filteredArray4.filter((value) =>
          QueryArray.includes(value)
        );
        const tmpArray = Schoolsres.data.schools.filter((item) =>
          filteredArray5.includes(item.school_name)
        );
        console.log("Tmp Array", tmpArray);
        setSchools(tmpArray);
      } else {
        const tmpArray = Schoolsres.data.schools.filter((item) =>
          filteredArray4.includes(item.school_name)
        );
        setSchools(tmpArray);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIntersect(filters);
    // console.log(schools);
    setCurrentPage(0);
  }, [mlc, query, filters]);

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

  console.log();

  //Pagination
  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;

  const currentPageData = schools
    .slice(offset, offset + PER_PAGE)
    .map((sch) => (
      <School sch={sch} key={sch.id} shortlistedSchools={shortlistedSchools} />
    ));

  const pageCount = Math.ceil(schools.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const handleAnyClick = ({ selected: selectedPage }) => {
    if (selectedPage > schools.length / PER_PAGE) {
      return (selectedPage = 0);
    }
    if (selectedPage < 0) {
      return (selectedPage = 0);
    }
  };

  // Filter Schools

  return (
    <Container>
      {isLoading && <div>Loading Schools...</div>}
      {currentPageData}
      {schools.length === 0 ? (
        <h3>No schools Found</h3>
      ) : (
        <Paginatecontainter>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={3}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-link"}
            nextClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            onClick={handleAnyClick}
          />
        </Paginatecontainter>
      )}
    </Container>
  );
};

export default Schools;

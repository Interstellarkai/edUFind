import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  GETALLSCHOOLS,
  publicRequest,
  FilterCcaGrp,
  FilterSubject,
  FilterZone,
  FilterEP,
} from "../requestMethod";
import School from "./School";
import ReactPaginate from "react-paginate";
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
  }, [mlc, query, filters]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   const getSchools = async () => {
  //     try {
  //       const res = await publicRequest.get(
  //         GETALLSCHOOLS + "?mainlevel_code=" + mlc
  //       );
  //       const Data = res.data.schools;
  //       console.log(Data);
  //       if (query !== "") {
  //         const filterSchools = Data.filter((school) => {
  //           return school.school_name
  //             .toUpperCase()
  //             .includes(query.toUpperCase());
  //         });
  //         setSchools(filterSchools);
  //       } else {
  //         setSchools(Data);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   setIsLoading(false);
  //   getSchools();
  // }, [mlc, query]);

  console.log();

  //Pagination
  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;

  const currentPageData = schools
    .slice(offset, offset + PER_PAGE)
    .map((sch) => <School sch={sch} key={sch.id} />);

  const pageCount = Math.ceil(schools.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  //Filter Schools

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
            marginPageDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-link"}
            nextClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </Paginatecontainter>
      )}
    </Container>
  );
};

export default Schools;

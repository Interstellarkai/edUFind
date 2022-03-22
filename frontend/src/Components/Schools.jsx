import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  GETALLSCHOOLS,
  publicRequest,
  FilterCcaGrp,
  FilterSubject,
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

    try {
      // CCA Cat filter
      const ccaCatRes = await publicRequest.get(FilterCcaGrp(filters.Category));
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
      const filteredArray = filterCcaCat.filter((value) =>
        filterSubject.includes(value)
      );

      console.log("CCA: ", filterCcaCat);
      console.log("SUBJECTS: ", filterSubject);
      console.log("FILTERED: ", filteredArray);

      //Filter against whole list of schools
      const tmpArray = schools.filter((item) =>
        filteredArray.includes(item.school_name)
      );
      console.log("Tmp Array", tmpArray);
      setSchools(tmpArray);
    } catch (err) {
      console.log(err);
    }

    // const filterSubjectArray = await publicRequest.get(
    //   FilterSubject(filters.subjectsOffered)
    // );
    // filteredArray = filterCcaCatArray.filter(value => filterSubjectArray.includes(value));
  };

  useEffect(() => {
    getIntersect(filters);
    // console.log(schools);
  }, []);
  // useEffect(() => {
  //   // getIntersect(filters);
  //   console.log(schools);
  // }, [schools]);

  useEffect(() => {
    setIsLoading(true);
    const getSchools = async () => {
      try {
        const res = await publicRequest.get(
          GETALLSCHOOLS + "?mainlevel_code=" + mlc
        );
        const Data = res.data.schools;
        console.log(Data);
        if (query !== "") {
          const filterSchools = Data.filter((school) => {
            return school.school_name
              .toUpperCase()
              .includes(query.toUpperCase());
          });
          setSchools(filterSchools);
        } else {
          setSchools(Data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    setIsLoading(false);
    getSchools();
  }, [mlc, query]);

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

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GETALLSCHOOLS, publicRequest } from "../requestMethod";
import School from "./School";
import ReactPaginate from "react-paginate";
// import { schools } from "../data";

const Container = styled.div`
  padding-top: 25px;
`;

const Schools = ({ query, click, mlc }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [schools, setSchools] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getSchools = async () => {
      setIsLoading(true);
      try {
        const res = await publicRequest.get(
          GETALLSCHOOLS + "?mainlevel_code=" + mlc
        );
        const Data = res.data.schools;
        console.log(Data);
        if (query !== "" && click === true) {
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
  }, [mlc, click]);

  console.log();

  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;

  const currentPageData = schools
    .slice(offset, offset + PER_PAGE)
    .map((sch) => <School sch={sch} key={sch.id} />);

  const pageCount = Math.ceil(schools.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  return (
    <Container>
      {!isLoading && <div>Loading Schools...</div>}
      {currentPageData}
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
    </Container>
  );
};

export default Schools;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest, GETSHORTLISTED } from "../requestMethod";
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

const ResultantSchools = ({ allSchools, query }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [initialPage, setInitialPage] = useState(0);
  const [shortlistedSchools, setShortlistedSchools] = useState([]);
  const currentUser = useSelector((state) => state.user.value);
  const addShortlist = useSelector((state) => state.shortlistAdd.value);
  const deleteShortlist = useSelector((state) => state.shortlistDelete.value);
  const dispatch = useDispatch();

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

  useEffect(() => {
    setCurrentPage(0);
  }, [query]);

  //Pagination
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  const filteredData = allSchools.filter((item) =>
    item.school_name.includes(query.toUpperCase())
  );
  const currentPageData = filteredData
    .slice(offset, offset + PER_PAGE)
    .map((sch) => (
      <School sch={sch} key={sch.id} shortlistedSchools={shortlistedSchools} />
    ));

  const pageCount = Math.ceil(filteredData.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const handleAnyClick = ({ selected: selectedPage }) => {
    if (selectedPage > filteredData.length / PER_PAGE) {
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
      {!isLoading && currentPageData}
      {allSchools.length === 0
        ? !isLoading && <h3>No schools Found</h3>
        : !isLoading && (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
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
              forcePage={currentPage}
            />
          )}
    </Container>
  );
};

export default ResultantSchools;

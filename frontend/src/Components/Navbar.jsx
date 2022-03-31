import styled from "styled-components";
import SchoolIcon from "@mui/icons-material/School";
import { Link, useNavigate } from "react-router-dom";
import PAGES from "../pageRoute";
import { useDispatch, useSelector } from "react-redux";
import AccountDropDown from "./AccountDropDown";
import { setSearchQ } from "../redux/searchQueryRedux";

const Container = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // background-color: #f5cb82;
  background-color: #ffffff;
  /* border-bottom: 1px solid black; */
  position: sticky;
`;

const Logo = styled.div`
  /* flex: 1; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0 20px; */
  padding-left: 20px;
  cursor: pointer;
  // color: #3838d1;
  color: #004175;
`;
const LogoText = styled.h1`
  margin-left: 10px;
`;

const SearchBar = styled.div`
  /* flex: 1; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  min-width: 30%;
  /* border: solid black; */
  /* padding: 10px; */
  margin: 10px;
`;
const Input = styled.input`
  flex: 5;
  height: inherit;
  /* border: 1px solid teal; */
  border: none;
  /* padding-right: 100px;*/
  padding-left: 10px;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  height: inherit;
  // background-color: teal;
  background-color: #004175;
  /* border: 1px solid teal; */
  color: white;
  padding: 0 10px;
  cursor: pointer;
`;

const ItemsContainer = styled.div`
  /* border: 1px solid blue; */
  /* flex: 1; */
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ItemText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-width: 100px; */
  /* border: black solid; */
`;

const StyledLink = styled(Link)`
  /* flex: 1; */
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.hoverable && "0 10px"};
  margin: ${(props) => props.hoverable && "0 10px"};
  color: inherit;
  transition: all 0.3s ease;
  font-weight: 700;
  cursor: pointer;

  ${(props) =>
    props.hoverable
      ? "&:hover { background-color: #004175; color: white;}"
      : ""}
`;

const AccountContainer = styled.div`
  display: flex;
  /* flex: 8; */
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  margin: 0 10px;
  font-weight: 700;
`;

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.value);
  const searchQ = useSelector((state) => state.searchQ.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(PAGES.searchResultsPage + "/" + searchQ);
  };
  // console.log(currentUser);
  return (
    <Container>
      <Logo>
        <SchoolIcon />
        <StyledLink to="/">
          <LogoText>edUFind</LogoText>
        </StyledLink>
      </Logo>

      <SearchBar>
        <Input
          placeholder="Find a School"
          onChange={(e) => dispatch(setSearchQ(e.target.value))}
          value={searchQ}
        />
        <Button onClick={handleClick}>Search</Button>
      </SearchBar>

      {currentUser.username !== false ? (
        <ItemsContainer>
          <StyledLink to={PAGES.recommendationsPage} hoverable="true">
            <ItemText>Recommendations</ItemText>
          </StyledLink>
          <StyledLink to={PAGES.shortlistPage} hoverable="true">
            <ItemText>My Shortlist</ItemText>
          </StyledLink>
          <AccountContainer>
            <ItemText>
              Welcome {currentUser.username}!
              <AccountDropDown />
            </ItemText>
          </AccountContainer>
        </ItemsContainer>
      ) : (
        <ItemsContainer>
          <StyledLink to={PAGES.loginPage} hoverable="true">
            <ItemText>Login</ItemText>
          </StyledLink>
          <StyledLink to={PAGES.registerPage1} hoverable="true">
            <ItemText>Sign Up</ItemText>
          </StyledLink>
        </ItemsContainer>
      )}
    </Container>
  );
};

export default Navbar;

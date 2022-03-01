import styled from "styled-components";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
import PAGES from "../pageRoute";

const Container = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5cb82;
`;

const Logo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
  color: #3838d1;
`;
const LogoText = styled.h1`
  /* margin-left: 10px; */
`;

const SearchBar = styled.div`
  flex: 1;
  width: 60%;
  /* border: solid black; */
  margin: 10px;
`;
const Input = styled.input`
  width: 60%;
  height: 100%;
  /* border: 1px solid teal; */
  border: none;
  padding: 10px 5px;
`;
const Button = styled.button`
  border: none;
  height: 100%;
  background-color: teal;
  /* border: 1px solid teal; */
  color: white;
  padding: 10px;
  cursor: pointer;
`;

const ItemsContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const ItemText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.shouldHover && "0 10px"};
  color: inherit;
  transition: all 0.3s ease;
  font-weight: 700;
  cursor: pointer;

  ${(props) =>
    props.shouldHover ? "&:hover { background-color: teal; color: white;}" : ""}
`;

const Navbar = () => {
  return (
    <Container>
      <Logo>
        <SchoolIcon
          sx={{ fontSize: 30, color: "primary", padding: "0 10px" }}
        />
        <StyledLink to="/">
          <LogoText>edUFind</LogoText>
        </StyledLink>
      </Logo>

      <SearchBar>
        <Input placeholder="Find a School" />
        <Button>Search</Button>
      </SearchBar>
      <ItemsContainer>
        <StyledLink to={PAGES.homePage} shouldHover="true">
          <ItemText>Recommendations</ItemText>
        </StyledLink>
        <StyledLink to={PAGES.homePage} shouldHover="true">
          <ItemText>My Shortlist</ItemText>
        </StyledLink>
        <StyledLink to={PAGES.loginPage} shouldHover="true">
          <ItemText>Login</ItemText>
        </StyledLink>
        <StyledLink to={PAGES.registerPage1} shouldHover="true">
          <ItemText>Sign Up</ItemText>
        </StyledLink>
      </ItemsContainer>
    </Container>
  );
};

export default Navbar;

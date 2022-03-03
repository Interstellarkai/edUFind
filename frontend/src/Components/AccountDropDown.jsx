import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/userRedux";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PAGES from "../pageRoute";

const Container = styled.div`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  /* border: 1px black solid; */
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  margin: 0 20px;
  cursor: pointer;
  z-index: 3;
`;
const DropDownMenuContainer = styled.div`
  position: absolute;
  right: 10%;
  width: 200%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* border: 1px solid black; */
  overflow: hidden;
  transition: all 0.8s ease;
  box-shadow: ${(props) =>
    !props.notOpen && "rgba(0, 0, 0, 0.2) 0px 16px 24px;"};
  z-index: 2;
`;

const DropDownMenu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* border: 1px solid blue; */
  background-color: #444444;
  border-radius: 5px;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 16px 24px;
  z-index: 1;

  transition: all 0.8s ease;
  transform: translateY(${(props) => props.notOpen * -200}%);
`;

const MenuItem = styled.li`
  flex: 1;
  color: #f5f5f5;
  padding: 10px;
  /* border-radius: inherit; */
  /* border: 1px solid black; */
  margin-bottom: 10px;
  transition: all ease 0.3s;
  &:hover {
    color: #444444;
    background-color: #f5f5f5;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: inherit;
  cursor: pointer;
`;

const AccountDropDown = () => {
  const [notOpen, setNotOpen] = useState(true);
  const userImg = useSelector((state) => state.user.value.img);

  const dispatch = useDispatch();
  const handleClick = (e) => {
    // e.preventDefault();
    dispatch(logout());
  };

  return (
    <Container>
      <Button onClick={() => setNotOpen(!notOpen)}>
        {
          <Avatar
            src={
              userImg
                ? userImg
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/330px-Elon_Musk_Royal_Society_%28crop2%29.jpg"
            }
          />
        }
      </Button>

      <DropDownMenuContainer notOpen={notOpen}>
        <DropDownMenu notOpen={notOpen}>
          <MenuItem>
            <StyledLink to={PAGES.accountPage}>Account</StyledLink>
          </MenuItem>
          <MenuItem onClick={handleClick}>Logout</MenuItem>
        </DropDownMenu>
      </DropDownMenuContainer>
    </Container>
  );
};

export default AccountDropDown;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AiFillSetting } from "react-icons/ai";
import { BiMath } from "react-icons/bi";
import PWAInstall from "./PWAInstall";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 0px;
  border-radius: 20px 20px 0px 0px;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  width: 100%;
  opacity: 0.8;

  box-shadow: 0px 0px 7.8px rgba(0, 0, 0, 0.008),
    0px 0px 17.2px rgba(0, 0, 0, 0.012), 0px 0px 28.8px rgba(0, 0, 0, 0.015),
    0px 0px 43.4px rgba(0, 0, 0, 0.018), 0px 0px 62.6px rgba(0, 0, 0, 0.02),
    0px 0px 88.6px rgba(0, 0, 0, 0.022), 0px 0px 125.7px rgba(0, 0, 0, 0.025),
    0px 0px 182.5px rgba(0, 0, 0, 0.028), 0px 0px 281.3px rgba(0, 0, 0, 0.032),
    0px 0px 500px rgba(0, 0, 0, 0.04);
  @media only screen and (max-width: 300px) {
    display: none;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0px;
`;

const NavItem = styled.li`
  height: 50px;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: baseline;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  padding: 5px;
  border-radius: 10px;
  transition: background-color 0.3s;
  font-size: 20px;
  background-color: ${({ active, theme }) => (active ? theme.background : 0)};

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.background : theme.cardBackground};
  }

  &:active {
    background-color: ${({ active, theme }) =>
      active ? theme.background : theme.cardBackground};
  }

  @media only screen and (max-width: 800px) {
    margin-right: 10px;
  }
`;

const NavBar = () => {
  const location = useLocation();

  return (
    <Nav>
      <NavList>
        <NavItem>
          <b>
            <NavLink to="/" active={location.pathname === "/"}>
              <BiMath style={{ padding: "10px" }} aria-label="Home" />
            </NavLink>
          </b>
        </NavItem>
        <NavItem>
          <b>
            <NavLink to="/settings" active={location.pathname === "/settings"}>
              <AiFillSetting
                style={{ padding: "10px" }}
                aria-label="Settings"
              />
            </NavLink>
          </b>
        </NavItem>
        <NavItem>
          <NavLink>
            <PWAInstall />
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default NavBar;

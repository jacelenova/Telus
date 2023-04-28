import React, { useState} from "react";
import { Collapse, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import { LoginMenu } from "./login/login-menu";
import { Link } from "react-router-dom";
import { StudentMenu } from "./student-menu";
import { AdminMenu } from "./admin-menu";

export const NavMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavBar = () => {
    setIsCollapsed(prev => !prev);
  }

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand to="/">Coding Test</NavbarBrand>
        <NavbarToggler onClick={toggleNavBar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!isCollapsed} navbar>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
            </NavItem>
            <StudentMenu />
            <AdminMenu />
            <LoginMenu />
          </ul>
        </Collapse>
      </Navbar>
    </header>
  )
}
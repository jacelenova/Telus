import React, { Fragment, useContext } from  "react";
import { AuthContext } from "../../contexts/auth-context";
import { NavItem, NavLink } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

export const LoginMenu = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);

  const logout = () => {
    logoutUser();
    navigate("/login");
  }

  const authenticatedView = () => {
    return (<Fragment>
      <NavItem>
        <NavLink href="#" className="text-dark" onClick={logout}>Logout</NavLink>
      </NavItem>
    </Fragment>);
  }

  const unAuthenticatedView = () => {
    return (<Fragment>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
      </NavItem>
    </Fragment>);
  }

  return (
    <>
      {
        user != null ?
          (authenticatedView()) :
          (unAuthenticatedView())
      }
    </>
  )
}
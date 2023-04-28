import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
import { AuthContext } from "../contexts/auth-context";
import { Role } from "../utils/enums";

export const StudentMenu = () => {
  const {user} = useContext(AuthContext);

  return (
    <>
      {
        user?.role === Role.Student && (
          <Fragment>
            <NavItem>
                <NavLink tag={Link} 
                  to="/student"
                  className="text-dark">
                  My Grades
                </NavLink>
            </NavItem>
          </Fragment>
        )
      }
    </>
  )
}

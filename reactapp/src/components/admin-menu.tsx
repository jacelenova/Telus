import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
import { AuthContext } from "../contexts/auth-context";
import { Role } from "../utils/enums";

export const AdminMenu = () => {
  const {user} = useContext(AuthContext);

  return (
    <>
      {
        user?.role === Role.Admin && (
          <Fragment>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/admin/subjects">Subjects</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/admin/students">Students</NavLink>
            </NavItem>
          </Fragment>
        )
      }
    </>
  )
}
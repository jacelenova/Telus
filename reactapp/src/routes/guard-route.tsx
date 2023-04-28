import React, { FC, useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Navigate } from "react-router-dom";
import Props from "../models/props";

export const GuardRoute: FC<Props> = ({children}) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {
        user != null ? children : (
          <Navigate to="/login" replace />
        )
      }
    </>
  )
}
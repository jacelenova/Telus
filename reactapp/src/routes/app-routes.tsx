import React, { Navigate, useRoutes } from "react-router-dom";
import { Home } from "../components/home/home";
import { Login } from "../components/login/login";
import { Grades } from "../components/grades/grades";
import { GuardRoute } from "./guard-route";
import { Students } from "../components/students/students";
import { Subjects } from "../components/subjects/subjects";


export const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/student",
      element: <GuardRoute><Grades /></GuardRoute>
    },
    {
      path: "/admin",
      children: [
        {
          path: '',
          element: <Navigate to="students" />,
        },
        {
          path: "students",
          element: <GuardRoute><Students /></GuardRoute>,
        },
        {
          path: "subjects",
          element: <GuardRoute><Subjects /></GuardRoute>
        }
      ]
    }
  ]);
}
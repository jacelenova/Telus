import React, { useContext, useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getGrades } from "../../services/api-service";
import { AuthContext } from "../../contexts/auth-context";
import User from "../../models/user";
import { useNavigate } from "react-router-dom";
import { Role } from "../../utils/enums";

export const Grades = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);

  const getStudentGrades = async (user: User) => {
    if (user && user.studentId) {
      var res = await getGrades(user.studentId);
      if (res.status === 200) {
        setGrades(res.value)
      }
    }
  }

  const gradeRow = (grade: any) => {
    return (
      <tr key={grade.subjectId}>
        <td>
          {grade.subjectName}
        </td>
        <td>{grade.grade}</td>
      </tr>
    )
  }

  useEffect(() => {
    if (user) {
      getStudentGrades(user);
    }
  }, [user])

  useEffect(() => {
    if (user?.role !== Role.Student) {
      navigate("/");
    }
  }, [user, navigate])

  const tableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Subject</th>
          <th>Grade</th>
        </tr>
      </thead>
    )
  }

  const tableBody = () => {
    return (
      <tbody>
        {grades.map(g => gradeRow(g))}
      </tbody>
    )
  }

  return (
    <>
      <Table>
        {tableHeader()}
        {tableBody()}
      </Table>
    </>
  )
}
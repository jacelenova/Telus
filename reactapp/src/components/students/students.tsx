import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { Role } from "../../utils/enums";
import { deleteStudent, getStudents } from "../../services/api-service";
import { Button, Row, Table } from "reactstrap";
import { StudentModal } from "../modals/student-modal";

export const Students = () => {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const getAllStudents = async () => {
    const res = await getStudents();
    setStudents(res.value);
  }

  const toggle = () => {
    setIsOpen(prev => !prev);
  }

  const openModal = () => {
    toggle();
  }

  const addNewStudent = (stud: any) => {
    setStudents([...students, stud]);
  }

  const deleteById = async (id: string) => {
    const res = await deleteStudent(id);
    if (res.status === 200) {
      const filtered = students.filter(s => s.id !== id);
      setStudents([...filtered]);
      return;
    }
  }

  useEffect(() => {
    if (user) {
      getAllStudents();
    }
  },[user])

  useEffect(() => {
    if (user?.role !== Role.Admin) {
      navigate("/");
      return;
    }
  }, [user, navigate])

  const tableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Email Address</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Action</th>
        </tr>
      </thead>
    )
  }

  const tableBody = () => {
    return (
      <tbody>
        {students.map(g => studentRow(g))}
      </tbody>
    )
  }

  const studentRow = (student: any) => {
    return (
      <tr key={student.id}>
        <td>{student.emailAddress}</td>
        <td>
          {student.firstName}
        </td>
        <td>{student.lastName}</td>
        <td>
          <Button color="danger" onClick={() => deleteById(student.id) }>Delete</Button>
        </td>
      </tr>
    )
  }

  return (
    <>
      <Row>
        <Button onClick={openModal}>Add Student</Button>
      </Row>
      <StudentModal isOpen={isOpen} toggle={toggle} add={addNewStudent}></StudentModal>
      <Table>
        {tableHeader()}
        {tableBody()}
      </Table>
    </>
  )
}
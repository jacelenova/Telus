import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { Role } from "../../utils/enums";
import { deleteStudent, getStudents } from "../../services/api-service";
import { Button, Table } from "reactstrap";
import { StudentModal } from "../modals/student-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { StudentEditModal } from "../modals/student-edit-modal";
import StudentType from "../../models/student";
import { GradeModal } from "../modals/grade-modal";

export const Students = () => {
  const { user, successToast } = useContext(AuthContext);
  const [students, setStudents] = useState<any[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [student, setStudent] = useState<StudentType | null>(null);

  const navigate = useNavigate();

  const getAllStudents = async () => {
    const res = await getStudents();
    setStudents(res.value);
  }

  const refresh = async () => {
    await getAllStudents();
  }

  const toggleGradeModal = () => {
    setIsGradeOpen(prev => !prev);
  }

  const toggleAddModal = () => {
    setIsAddOpen(prev => !prev);
  }

  const toggleEditModal = () => {
    setIsEditOpen(prev => !prev);
  }

  const openModal = () => {
    toggleAddModal();
  }

  const addNewStudent = (stud: any) => {
    setStudents([...students, stud]);
  }

  const deleteById = async (id: string) => {
    const res = await deleteStudent(id);
    if (res.status === 200) {
      successToast("Delete success!");
      const filtered = students.filter(s => s.id !== id);
      setStudents([...filtered]);
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

  const openStudentEdit = (id: string) => {
    const stud = students.find(s => s.id === id);
    setStudent(stud as StudentType);
    toggleEditModal();
  }

  const openGradeModal = (id: string) => {
    const stud = students.find(s => s.id === id);
    setStudent(stud as StudentType);
    toggleGradeModal();
  }

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
          <button className="btn" onClick={() => deleteById(student.id) }>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className="btn" onClick={() => openStudentEdit(student.id) }>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn" onClick={() => openGradeModal(student.id) }>
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
        </td>
      </tr>
    )
  }

  return (
    <>
      <StudentModal isOpen={isAddOpen} toggle={toggleAddModal} add={addNewStudent} afterSave={refresh}></StudentModal>
      <StudentEditModal isOpen={isEditOpen} toggle={toggleEditModal} studentId={student?.id ?? null} afterSave={refresh}></StudentEditModal>
      <GradeModal isOpen={isGradeOpen} toggle={toggleGradeModal} studentId={student?.id ?? null} afterSave={refresh}></GradeModal>
      <Table>
        {tableHeader()}
        {tableBody()}
      </Table>
      <Button onClick={openModal} color="primary">Add Student</Button>
    </>
  )
}
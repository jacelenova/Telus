import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { Role } from "../../utils/enums";
import { Button, Row, Table } from "reactstrap";
import { deleteSubject, getSubjects } from "../../services/api-service";
import { SubjectModal } from "../modals/subject-modal";

export const Subjects = () => {
  const { user, successToast } = useContext(AuthContext);
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getAllSubjects = async () => {
    const res = await getSubjects();
    if (res.status === 200) {
      setSubjects(res.value);
    }
  }

  const deleteById = async (id: string) => {
    const res = await deleteSubject(id);
    if (res.status === 200) {
      successToast("Delete success!");
      const filtered = subjects.filter(s => s.id !== id);
      setSubjects([...filtered]);
    }
  }

  const toggle = () => {
    setIsOpen(prev => !prev);
  }

  const openModal = () => {
    toggle();
  }

  const addNewSubject = (subj: any) => {
    setSubjects([...subjects, subj]);
  }
  
  useEffect(() => {
    if (user?.role !== Role.Admin) {
      navigate("/");
    }
  }, [user, navigate])

  useEffect(() => {
    getAllSubjects();
  },[])

  const tableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
    )
  }

  const tableBody = () => {
    return (
      <tbody>
        {subjects.map(s => subjectRow(s))}
      </tbody>
    )
  }

  const subjectRow = (subject: any) => {
    return (
      <tr key={subject.id}>
        <td>{subject.name}</td>
        <td>
          <Button color="danger" onClick={() => deleteById(subject.id) }>Delete</Button>
        </td>
      </tr>
    )
  }

  return (
    <>
      <Row>
        <Button onClick={openModal}>Add Subject</Button>
      </Row>
      <SubjectModal isOpen={isOpen} toggle={toggle} add={addNewSubject}></SubjectModal>
      <Row>
        <Table>
          {tableHeader()}
          {tableBody()}
        </Table>
      </Row>

    </>
  )
}
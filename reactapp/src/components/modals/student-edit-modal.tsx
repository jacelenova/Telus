import React, { useContext, useEffect, useRef, useState } from "react";
import { ModalPropsType } from "../../models/props";
import { Alert, Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap";
import { SelectInput } from "../select/select-input";
import { getStudentWithSubjects, getSubjects, updateStudent } from "../../services/api-service";
import SubjectType from "../../models/subject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/auth-context";



export const StudentEditModal = ({ isOpen, toggle, studentId, afterSave }: ModalPropsType & { studentId: string | null } ) => {
  const { successToast, failToast } = useContext(AuthContext);
  const [isAlert, setIsAlert] = useState(false);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [student, setStudent] = useState<any | null>(null);
  const selectRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null); 
  const lastNameRef = useRef<HTMLInputElement>(null);

  const getStudent = async (id: string) => {
    const res = await getStudentWithSubjects(id);
    if (res.status === 200) {
      setStudent(res.value);
    }
  }

  useEffect(() => {
    if (isOpen && studentId) {
      getAllSubjects();
      getStudent(studentId);
    }
  }, [isOpen, studentId]);

  const getAllSubjects = async () => {
    const res = await getSubjects();
    if (res.status === 200) {
      setSubjects(res.value as SubjectType[]);
    }
  }

  const toggleAlert = () => {
    setIsAlert(prev => !prev);
  }

  const save = async () => {
    student.firstName = nameRef?.current?.value;
    student.lastName = lastNameRef?.current?.value;
    const res = await updateStudent(student);
    if (res.status === 200) {
      if (afterSave) {
        await afterSave();
      }
      successToast()
      toggle();
    }
    else {
      failToast();
    }
  }

  const addSubject = () => {
    const val = selectRef?.current?.value;
    const found = student?.subjects.find((s: any) => s.id === val);
    if (!found && val) {
      const subj = subjects.find(s => s.id === val);
      if (subj) {
        student.subjects.push(subj);
        setStudent({...student});
      }
    }
  }

  const removeSubject = (id: string) => {
    if (student) {
      student.subjects = student.subjects.filter((s: any) => s.id !== id);
      setStudent({ ...student });
    }
  }
  
  return (
    <>
      <Alert color="danger" isOpen={isAlert} toggle={toggleAlert}>
        Error Saving!
      </Alert>
      <Modal isOpen={isOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Subject</ModalHeader>
        <ModalBody>
          <Form onSubmit={save}>
            <h4>Edit Student</h4>
            <hr/>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="subjectName">
                    First Name
                  </Label>
                  <Input
                    id="studentFirstName"
                    name="subjstudentFirstNameectName"
                    placeholder="First Name"
                    innerRef={nameRef}
                    defaultValue={student?.firstName}
                    bsSize="sm"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="subjectName">
                    Last Name
                  </Label>
                  <Input
                    id="studentLastName"
                    name="studentLastName"
                    placeholder="Last Name"
                    innerRef={lastNameRef}
                    defaultValue={student?.lastName}
                    bsSize="sm"
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <SelectInput options={subjects} label="Subjects" ref={selectRef}></SelectInput>
          <Button color="primary" size="sm" onClick={() => addSubject()}>Add Subject</Button>
          <br /><br />
          <h4>Subjects</h4>
          <Table size="sm">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                student?.subjects?.map((s: any) => {
                  return (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>
                        <button className="btn" onClick={() => removeSubject(s.id) }>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={save}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
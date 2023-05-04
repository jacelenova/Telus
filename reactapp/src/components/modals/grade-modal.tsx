import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import { ModalPropsType } from "../../models/props";
import { getGrades, updateGrades } from "../../services/api-service";
import { AuthContext } from "../../contexts/auth-context";

export const GradeModal = ({ isOpen, toggle, studentId, afterSave }: ModalPropsType & { studentId: string | null }) => {
  const [grades, setGrades] = useState<any[]>([]);
  const { successToast, failToast } = useContext(AuthContext);

  const getStudentGrades = useCallback(async (id: string) => {
    const res = await getGrades(id);
    if (res.status === 200) {
      setGrades(res.value);
    }
  }, [setGrades])

  const save = async () => {
    if (studentId && grades) {
      const res = await updateGrades(studentId, grades);
      if (res.status === 200) {
        if (afterSave) {
          successToast();
          afterSave();
        }
        toggle();
      } else {
        failToast();
      }
    }
  }

  const gradeChange = (e: any, subjectId: string) => {
    const grade = grades.find(g => g.subjectId === subjectId);
    if (grade) {
      var value = e?.currentTarget?.value ?? grade.grade
      grade.grade = parseFloat(value);
    }
    setGrades([...grades]);
  }

  useEffect(() => {
    if (isOpen && studentId) {
      getStudentGrades(studentId);
    }
  }, [isOpen, studentId, getStudentGrades]);

  const tableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Subject Name</th>
          <th>Grade</th>
        </tr>
      </thead>
    );
  }

  const tableBody = () => {
    return (
      <tbody>
        {
          grades?.map(g => {
            return (
              <tr key={g.subjectId}>
                <td>{g.subjectName}</td>
                <td><Input defaultValue={g.grade} onChange={e => gradeChange(e, g.subjectId)} type="number"/></td>
              </tr>
            )
          })
        }
      </tbody>
    );
  }

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Grades</ModalHeader>
        <ModalBody>
          <Table>
            {tableHeader()}
            {tableBody()}
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
    </div>
  );
}

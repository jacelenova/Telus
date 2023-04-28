import React, { useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import { ModalPropsType } from "../../models/props";
import { addSubject } from "../../services/api-service";



export const SubjectModal = ({ isOpen, toggle, add }: ModalPropsType & { add: (subj: any) => void}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const [isAlert, setIsAlert] = useState(false);

  const toggleAlert = () => {
    setIsAlert(prev => !prev);
  }

  const save = async () => {
    if (nameRef.current) {
      try {
        var res = await addSubject({ name: nameRef.current.value});
        if (res.status === 200) {
          add(res.value);
        } else {
          setIsAlert(false);
        }
      } catch (e) {
        setIsAlert(false);
      }

      nameRef.current.value = "";
    }
    toggle();
  }

  return (
    <div>
      <Alert color="danger" isOpen={isAlert} toggle={toggleAlert}>
        Error Saving!
      </Alert>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form onSubmit={save}>
            <h3>Add Subject</h3>
            <hr/>
            <FormGroup floating>
              <Input
                id="subjectName"
                name="subjectName"
                placeholder="Subject Name"
                innerRef={nameRef}
              />
              <Label for="subjectName">
                Name
              </Label>
            </FormGroup>
          </Form>
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
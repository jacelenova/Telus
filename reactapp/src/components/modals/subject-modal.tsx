import React, { useContext, useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Alert } from "reactstrap";
import { ModalPropsType } from "../../models/props";
import { addSubject } from "../../services/api-service";
import { AuthContext } from "../../contexts/auth-context";
import { fail } from "assert";



export const SubjectModal = ({ isOpen, toggle, add }: ModalPropsType & { add: (subj: any) => void}) => {
  const { successToast, failToast } = useContext(AuthContext);
  const nameRef = useRef<HTMLInputElement>(null);

  const save = async () => {
    if (nameRef.current) {
      try {
        var res = await addSubject({ name: nameRef.current.value});
        if (res.status === 200) {
          add(res.value);
          successToast();
        } else {
          failToast();
        }
      } catch (e) {
        failToast();
      }

      nameRef.current.value = "";
    }
    toggle();
  }

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Subject</ModalHeader>
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
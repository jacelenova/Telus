import React, { useContext, useRef } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, ModalFooter, Button } from "reactstrap";
import { addStudent } from "../../services/api-service";
import { ModalPropsType } from "../../models/props";
import { AuthContext } from "../../contexts/auth-context";

export const StudentModal = ({ isOpen, toggle, add, afterSave }: ModalPropsType & { add: (subj: any) => void}) => {
  const { successToast, failToast } = useContext(AuthContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const save = async () => {
    if (nameRef.current && lastRef.current && emailRef.current) {
      try {
        var res = await addStudent({ firstName: nameRef.current.value, lastName: lastRef.current.value, email: emailRef.current.value });
        if (res.status === 200) {
          if (afterSave) {
            await afterSave();
          }
          successToast();
          toggle();
        } else {
          failToast();
        }
      } catch (e) {
        failToast();
      }
      nameRef.current.value = "";
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Student</ModalHeader>
        <ModalBody>
          <Form onSubmit={save}>
            <h3>Add Student</h3>
            <hr/>
            <FormGroup floating>
              <Input
                id="modalFirstName"
                name="firstName"
                placeholder="First Name"
                innerRef={nameRef}
              />
              <Label for="modalFirstName">
                First Name
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="modalLastName"
                name="lastName"
                placeholder="Last Name"
                innerRef={lastRef}
              />
              <Label for="modalLastName">
                Last Name
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                id="modalEmail"
                name="email"
                placeholder="Email"
                type="email"
                innerRef={emailRef}
              />
              <Label for="modalEmail">
                Email
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
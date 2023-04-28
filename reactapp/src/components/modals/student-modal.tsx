import React, { useRef, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, ModalFooter, Button, Alert } from "reactstrap";
import { addStudent } from "../../services/api-service";
import { ModalPropsType } from "../../models/props";

export const StudentModal = ({ isOpen, toggle, add }: ModalPropsType & { add: (subj: any) => void}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [isAlert, setIsAlert] = useState(false);

  const toggleAlert = () => {
    setIsAlert(prev => !prev);
  }

  const save = async () => {
    if (nameRef.current && lastRef.current && emailRef.current) {
      try {
        var res = await addStudent({ firstName: nameRef.current.value, lastName: lastRef.current.value, email: emailRef.current.value });
        if (res.status === 200) {
          add(res.value);
        } else {
          setIsAlert(true);
        }
      } catch (e) {
        setIsAlert(true);
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
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { AuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { loginUser, user} = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement >(null);
  const navigate = useNavigate();

  const submit = async () => {
    const res = await loginUser(userRef.current?.value ?? "", passwordRef.current?.value ?? "");
    setIsError(res);
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate])

  return (
    <>
      <Form onSubmit={submit}>
        <h1>Login</h1>
        <hr></hr>
        <FormGroup floating>
          <Input
            id="loginEmail"
            name="username"
            placeholder="Username"
            type="email"
            innerRef={userRef}
          />
          <Label for="loginEmail">
            Email
          </Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="loginPassword"
            name="password"
            placeholder="Password"
            type="password"
            innerRef={passwordRef}
          />
          <Label for="loginPassword">
            Password
          </Label>
        </FormGroup>
      </Form>
      {
        isError && (
          <Alert color="danger">
            Username or password is incorrect.
          </Alert>
        )
      }

      <Button onClick={submit}>
        Submit
      </Button>
    </>
  )
}
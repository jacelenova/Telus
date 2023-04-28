import React, { useContext } from "react";
import { Row } from "reactstrap";
import { AuthContext } from "../../contexts/auth-context";

export const Home = () => {
  const {user} = useContext(AuthContext);

  return (
    <>
      {user && <h1>Hello {user.firstName}</h1>}
      <br/><br/>
      <h3>Default Admin Account</h3>
      <Row>
        <div>
          Username: <code>admin@admin"</code>
        </div>
        <div>
          Password: <code>1</code>
        </div>
      </Row>
      <br/>
      <h3>Default Student Account</h3>
      <Row>
        <div>
          Username: <code>steph@warriors"</code>
        </div>
        <div>
          Password: <code>2</code>
        </div>
      </Row>
    </>
  )
}
import React, { FC } from "react"
import { Container } from "reactstrap"
import { ToastContainer } from 'react-toastify';
import { NavMenu } from "./nav-menu"
import Props from "../models/props"

export const Layout: FC<Props> = ({children}) => {
  return (
    <div>
      <ToastContainer></ToastContainer>
      <NavMenu />
      <Container tag="main">
        {children}
      </Container>
    </div>
  )
}
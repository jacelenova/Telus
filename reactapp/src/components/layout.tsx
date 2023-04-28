import React, { FC } from "react"
import { Container } from "reactstrap"
import { NavMenu } from "./nav-menu"
import Props from "../models/props"

export const Layout: FC<Props> = ({children}) => {
  return (
    <div>
      <NavMenu />
      <Container tag="main">
        {children}
      </Container>
    </div>
  )
}
import { ReactNode } from "react"

export type Props = {
  children: ReactNode;
}

export type ModalPropsType = {
  isOpen: boolean,
  toggle: () => void
}

export default Props;
import { ReactNode } from "react"

export type Props = {
  children: ReactNode;
}

export type ModalPropsType = {
  isOpen: boolean,
  toggle: () => void,
  afterSave?: () => Promise<void> | null
}

export default Props;
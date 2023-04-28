import { Role } from "../utils/enums";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
  studentId: string | null;
}

export default User;
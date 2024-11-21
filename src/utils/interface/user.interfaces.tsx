import { USER_TYPES } from "../enums/userTypes.enum";

export default interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  type: USER_TYPES;
}

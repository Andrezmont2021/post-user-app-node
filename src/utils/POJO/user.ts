// For creates and updates data in/out
export interface UserObject {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResponseUser {
  isOk: boolean,
  message: string,
  data?: UserObject
}

export interface UserInterface {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  address: string;
  userTypeId: string;
  password?: string;
  confirmPassword?: string;
}
export interface DeleteUserInterface {
  email: string;
  password: string;
}
export interface LoginUserInterface {
  email: string;
  password: string;
}

export interface UserTypeInterface {
  id: string;
  name: string;
}

export class UserModel {
  id!: string;
  userTypeId!: string;
  name!: string;
  surname!: string;
  email!: string;
  phone!: string;
  address!: string;
  password?: string;

  token?: string;
}

export class GroupModel {
  name!: string;
  description?: string;
  members!: string[];
  expenses!: string[];
  createdAt!: Date;
  updatedAt!: Date;
}

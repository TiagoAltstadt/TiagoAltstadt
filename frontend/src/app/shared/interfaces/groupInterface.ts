export interface GroupInterface {
  name: string;
  description?: string;
  members: string[];
  expenses: string[];
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

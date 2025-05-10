import mongoose, { Schema, model } from "mongoose";

export interface Person {
  id?: string;
  name: string;
  surname: string;
  gender: string;
  dateOfBirth: Date;
  relations?: Relations;
}

interface Relations {
  father?: string | null;
  mother?: string | null;
  children: string[];
  siblings: string[];
  pids?: string[];
}

export const PersonSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    relations: {
      father: { type: Schema.Types.ObjectId, ref: "Person", default: null },
      mother: { type: Schema.Types.ObjectId, ref: "Person", default: null },
      children: { type: [Schema.Types.ObjectId], ref: "Person", default: [] },
      siblings: { type: [Schema.Types.ObjectId], ref: "Person", default: [] },
      pids: { type: [Schema.Types.ObjectId], ref: "Person", default: [] },
    },
  }
);

export const PersonModel = model<Person>("Person", PersonSchema);

import { Schema, model } from "mongoose";

export interface User {
  userTypeId: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    userTypeId: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id; // Map _id to id
        delete ret._id; // Exclude _id from the output
        delete ret.__v; // Exclude __v from the output
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id; // Map _id to id
        delete ret._id; // Exclude _id from the output
        delete ret.__v; // Exclude __v from the output
      },
    },
    timestamps: true, // Automatically handle createdAt and updatedAt fields
  }
);

export const UserModel = model<User>("User", UserSchema);

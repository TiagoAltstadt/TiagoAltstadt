import { Schema, model } from "mongoose";

export interface UserType {
  id: string;
  name: string;
}

export const UserTypeSchema = new Schema<UserType>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id; // Exclude _id from the output
        delete ret.__v; // Exclude __v from the output
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id; // Exclude _id from the output
        delete ret.__v; // Exclude __v from the output
      },
    },
    timestamps: true, // Automatically handle createdAt and updatedAt fields
  }
);

export const UserTypeModel = model<UserType>("UserType", UserTypeSchema);

import mongoose, { Schema, model, Document } from "mongoose";

// Define the BalanceSheetEntry interface for individual balance entries
interface BalanceSheetEntry {
  groupId: mongoose.Schema.Types.ObjectId; // References a group
  userId: mongoose.Schema.Types.ObjectId; // The user this user owes or is owed by
  amountOwed: number; // Total amount this user owes to the other user in the group
  amountOwedBy: number; // Total amount the other user owes to this user in the group
}

// Balance sheet schema definition
const balanceSheetSchema = new Schema<BalanceSheetEntry>({
  groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amountOwed: { type: Number, default: 0 },
  amountOwedBy: { type: Number, default: 0 },
});

// User interface, aligning with Mongoose's requirements
export interface User {
  userTypeId: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  balanceSheet: BalanceSheetEntry[]; // Array of balance sheet entries
  groups: Schema.Types.ObjectId[];
}

// Define the main User schema
const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    userTypeId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    balanceSheet: { type: [balanceSheetSchema], default: [] }, // Embedding balanceSheetSchema
    groups: { type: [String], required: true },
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

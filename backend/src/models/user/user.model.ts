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
  id?: string;
  userTypeId: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  balanceSheet: BalanceSheetEntry[]; // Array of balance sheet entries
  groups: Schema.Types.ObjectId[];
  token?: string;
  confirmationCode?: string;
  enabled?: boolean;
}

// Define the main User schema
const UserSchema = new Schema<User>(
  {
    userTypeId: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: false },
    balanceSheet: { type: [balanceSheetSchema], default: [] },
    groups: { type: [Schema.Types.ObjectId], ref: "Group", default: [] },
    confirmationCode: { type: String, required: true },
    enabled: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Virtual field to map _id to id
UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const UserModel = model<User>("User", UserSchema);

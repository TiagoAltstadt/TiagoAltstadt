// models/transaction.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface TransactionDocument extends Document {
  amount: number;
  description: string;
  date: Date;
  payerId: mongoose.Schema.Types.ObjectId; // User who made the payment
  recipientId: mongoose.Schema.Types.ObjectId; // User who owes or is owed by the payer
  groupId: mongoose.Schema.Types.ObjectId; // References the group (can be null for personal transactions)
}

const transactionSchema = new Schema<TransactionDocument>({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  payerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  groupId: { type: Schema.Types.ObjectId, ref: "Group" },
});

export const TransactionModel = mongoose.model<TransactionDocument>("Transaction", transactionSchema);

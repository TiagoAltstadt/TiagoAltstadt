import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  amount: number;
  paidBy: mongoose.Types.ObjectId;
  title: string;
  payers: mongoose.Types.ObjectId[]; // Array of user IDs
}

const expenseSchema = new Schema<IExpense>({
  amount: { type: Number, required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  payers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
});

export const ExpenseModel = mongoose.model<IExpense>('Expense', expenseSchema);

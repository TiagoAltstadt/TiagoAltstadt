import mongoose, { Schema, model, Document } from "mongoose";

interface GroupDocument extends Document {
  name: string;
  description?: string;
  members: mongoose.Schema.Types.ObjectId[]; // References to user IDs
  expenses: mongoose.Schema.Types.ObjectId[]; // References to expense IDs
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema = new Schema<GroupDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of user IDs who are members of this group
    expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }], // Array of expense IDs associated with this group
  },
  {
    timestamps: true, // Automatically create `createdAt` and `updatedAt` timestamps
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const GroupModel = model<GroupDocument>("Group", GroupSchema);

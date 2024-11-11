import { Router } from "express";
import mongoose, { Types } from "mongoose";
import { UserModel } from "../models/user/user.model";
import { GroupModel } from "../models/user/group.model";
import { ExpenseModel } from "../models/user/expense.model";
import {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  sendErrorResponse,
} from "../configs/http_status";
const router = Router();

// Get all expenses
router.get("/expenses", async (req, res) => {
  try {
    const expenses = await ExpenseModel.find();
    return res.status(200).json(expenses);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
// Get all groups
router.get("/groups", async (req, res) => {
  try {
    const groups = await GroupModel.find();
    return res.status(200).json(groups);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
// Create a new group
router.post("/createGroup", async (req, res) => {
  const { name, creatorId, members, description } = req.body;

  //---------- Checking for missing Data
  const missingFields = [];

  if (!name) missingFields.push("name");
  if (!creatorId) missingFields.push("creatorId");
  if (!members) missingFields.push("members");

  if (missingFields.length > 0) {
    const errorMessage = `Check that the following variables are provided: ${missingFields.join(
      ", "
    )}`;
    sendErrorResponse(res, HTTP_BAD_REQUEST, errorMessage);

    return;
  }

  try {
    // Check if the group name already exists
    const existingGroup = await GroupModel.findOne({ name: name });
    if (existingGroup) {
      return sendErrorResponse(
        res,
        HTTP_BAD_REQUEST,
        "A group with this name already exists."
      );
    }

    const user = await UserModel.findById(creatorId);
    if (!user) {
      return sendErrorResponse(res, HTTP_BAD_REQUEST, "No user found.");
    }

    // Create the new group
    const newGroup = new GroupModel({
      name: name,
      description: description,
      creator: creatorId,
      members: [creatorId, ...members],
    });

    await newGroup.save();

    newGroup.members.forEach(async (member) => {
      // Check if the user exists
      const user = await UserModel.findById(member);
      if (!user) {
        return sendErrorResponse(res, HTTP_BAD_REQUEST, "No user found.");
      }

      if (user.groups.includes(newGroup.id)) return;

      if (user.groups) {
        user.groups.push(newGroup.id);
      } else {
        user.groups = [newGroup.id];
      }

      await user.save();
    });
    return res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (err: unknown) {
    if (err instanceof Error) {
      sendErrorResponse(res, HTTP_BAD_REQUEST, err.message);
    } else {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "An unknown error occurred");
    }
  }
});
// Create a new expense
router.post("/newExpense", async (req, res) => {
  const { groupId, paidBy, payers, title, amount } = req.body;

  try {
    // Find the group
    const group = await GroupModel.findById(groupId);
    if (!group) {
      return sendErrorResponse(res, HTTP_NOT_FOUND, "Group not found");
    }

    // Create the new expense document
    const expense = new ExpenseModel({
      amount,
      paidBy,
      title,
      payers,
    });

    // Save the expense to the expenses array of the group
    group.expenses.push(expense._id as mongoose.Schema.Types.ObjectId);
    await expense.save();
    await group.save();

    // Optional: calculate each payer's share if needed (e.g., equally split)
    const equalShare = amount / payers.length;
    const payerShares = payers.map((payerId: any) => ({
      payerId,
      share: equalShare,
    }));

    return res.status(201).json({
      message: "Expense added and split successfully",
      expense,
      shares: payerShares,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
// Delete a group
router.delete("/group/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const group = await GroupModel.findByIdAndDelete(id);
    if (!group) {
      return res.status(404).json({ message: "GroupModel not found" });
    }

    group.members.forEach(async (member) => {
      // Check if the user exists
      const user = await UserModel.findById(member);
      if (!user) {
        return sendErrorResponse(res, HTTP_BAD_REQUEST, "No user found.");
      }

      user.groups = user.groups.filter((groupId) => groupId !== group.id);

      await user.save();
    });

    return res.status(200).json({ message: "GroupModel deleted successfully" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
// Delete an expense
router.delete("/expense/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await ExpenseModel.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
// Edit a group
router.patch("/group/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const group = await GroupModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!group) {
      sendErrorResponse(res, HTTP_NOT_FOUND, "Group not found");
    }
    return res.status(200).json(group);
  } catch (err: unknown) {
    if (err instanceof Error) {
      sendErrorResponse(res, HTTP_BAD_REQUEST, err.message);
    } else {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "An unknown error occurred");
    }
  }
});
// Edit an expense
router.patch("/expense/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const expense = await ExpenseModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!expense) {
      return sendErrorResponse(res, HTTP_NOT_FOUND, "Expense not found");
    }
    return res.status(200).json(expense);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return sendErrorResponse(res, HTTP_BAD_REQUEST, err.message);
    } else {
      return sendErrorResponse(
        res,
        HTTP_BAD_REQUEST,
        "An unknown error occurred"
      );
    }
  }
});
// Get a specific group
router.get("/group/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const group = await GroupModel.findById(id);
    if (!group) {
      return res.status(404).json({ message: "GroupModel not found" });
    }
    return res.status(200).json(group);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
// Get a specific expense
router.get("/expense/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await ExpenseModel.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json(expense);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});
// Add new member to a group
router.post("/addMember", async (req, res) => {
  const { groupId, userId } = req.body;

  const user = await UserModel.findById(userId);
  if (!user) {
    return sendErrorResponse(res, HTTP_BAD_REQUEST, "No user found.");
  }

  try {
    // Find the group by ID
    const group = await GroupModel.findById(groupId);

    if (!group) {
      sendErrorResponse(res, HTTP_NOT_FOUND, "GroupModel not found");
      return;
    }

    // Check if the user is already a member
    if (group.members.includes(new mongoose.Schema.Types.ObjectId(userId))) {
      sendErrorResponse(res, HTTP_NOT_FOUND, "UserModel is already a member");
      return;
    }

    // Add the new member
    group.members.push(userId);
    await group.save();
    return res.status(200).json({
      message:
        "User " +
        user.name +
        " added to the group '" +
        group.name +
        "' successfully",
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      sendErrorResponse(res, HTTP_BAD_REQUEST, err.message);
    } else {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "An unknown error occurred");
    }
  }
});
// Remove member to a group
router.delete("/removeMember", async (req, res) => {
  const { groupId, userId } = req.body;

  const user = await UserModel.findById(userId);
  if (!user) {
    return sendErrorResponse(res, HTTP_BAD_REQUEST, "No user found.");
  }

  try {
    // Find the group by ID
    const group = await GroupModel.findById(groupId);

    if (!group) {
      sendErrorResponse(res, HTTP_NOT_FOUND, "Group not found");
      return;
    }

    // Check if the user is already a member
    if (!group.members.includes(userId)) {
      sendErrorResponse(res, HTTP_NOT_FOUND, "User is not a member");
      return;
    }

    // Add the new member
    group.members = group.members.filter((userIdItem) => {
      return userIdItem.toString() !== userId;
    });
    // Remove group from user
    user.groups = user.groups.filter((userGroupItem) => {
      return userGroupItem.toString() !== group.id;
    });

    await user.save();
    await group.save();
    return res.status(200).json({
      message:
        "User " +
        user.name +
        " removed from group '" +
        group.name +
        "' successfully.",
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      sendErrorResponse(res, HTTP_BAD_REQUEST, err.message);
    } else {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "An unknown error occurred");
    }
  }
});

export default router;

const mongoose = require("mongoose");
import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_OK,
} from "../configs/http_status";
import { UserType, UserTypeModel } from "../models/user/user-type.model";

const router = Router();
const environment = "- User Type: ";

//----------Get all----------
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const userTypes = await UserTypeModel.find();
    if (!userTypes) {
      res.status(HTTP_BAD_REQUEST).send([]);
      return;
    }
    res.status(HTTP_OK).send(userTypes);
  })
);
//----------Create----------
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { id, name } = req.body;

    const newUserType: UserType = {
      id: id,
      name: name,
    };

    if (!newUserType.id) {
      res.status(HTTP_BAD_REQUEST).send("Missing user type ID");
      return;
    }
    if (!newUserType.name) {
      res.status(HTTP_BAD_REQUEST).send("Missing user typ Name");
      return;
    }

    const userType = await UserTypeModel.findOne({ id: newUserType.id });
    if (userType) {
      res.status(HTTP_BAD_REQUEST).send("User type already exists");
      return;
    }

    await UserTypeModel.create(newUserType);
    res.status(HTTP_OK).send("User id Created");
    console.log(environment + "User Type Created.");
    return;
  })
);
//----------Update----------
router.put(
  "/:urlId",
  asyncHandler(async (req, res) => {
    const { urlId } = req.params;
    const { name, id } = req.body;

    if (!urlId) {
      res.status(HTTP_BAD_REQUEST).send("Missing ID");
      return;
    }

    const userType = await UserTypeModel.findOne({ id: urlId });

    if (!userType) {
      res.status(HTTP_NOT_FOUND).send("No user type found with that ID");
      return;
    }

    userType.id = id;
    userType.name = name;
    console.log("Flag 1", userType);
    await userType.save();
    console.log("Flag 2");
    res.status(HTTP_OK).send("User type updated successfully!");
    console.log(environment + "User Type Updated.");
    return;
  })
);
//----------Delete----------
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
      res.status(HTTP_BAD_REQUEST).send("Invalid user Type iD");
      return;
    }

    const userType = await UserTypeModel.findOne({ id });
    if (!userType) {
      res.status(HTTP_BAD_REQUEST).send("No Match for User Type ID");
      return;
    }

    await UserTypeModel.deleteOne({ id: userType.id });
    res.status(HTTP_OK).send("User Type successfully deleted");
    console.log(environment + "User Type Deleted.");
    return;
  })
);
//----------Search user type by type----------
router.post(
  "/searchById/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
      res.status(HTTP_BAD_REQUEST).send("Missing user type ID");
    }

    const usertype = await UserTypeModel.findOne({ id });
    if (!usertype) {
      res.status(HTTP_BAD_REQUEST).send("No user type registered with that ID");
      return;
    }
    res.status(HTTP_OK).send(usertype);
    return;
  })
);

export default router;

const mongoose = require("mongoose");
import { Router } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user/user.model";
import {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_OK,
  sendErrorResponse,
} from "../configs/http_status";
import bcrypt from "bcryptjs";
import { UserTypeModel } from "../models/user/user-type.model";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await UserModel.find();
    if (!users) {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "Error fetching all users");
      return;
    }
    res.status(HTTP_OK).send(users);
    return;
  })
);
//----------Register----------
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, surname, email, phone, address, password } = req.body;

    //---------- Checking for missing Data
    const missingFields = [];

    if (!name) missingFields.push("name");
    if (!surname) missingFields.push("surname");
    if (!email) missingFields.push("email");
    if (!phone) missingFields.push("phone");
    if (!address) missingFields.push("address");
    if (!password) missingFields.push("password");

    if (missingFields.length > 0) {
      const errorMessage = `Check that the following variables are provided: ${missingFields.join(
        ", "
      )}`;
      sendErrorResponse(res, HTTP_BAD_REQUEST, errorMessage);

      return;
    }

    // Validate the user is not already registered
    const user = await UserModel.findOne({ email });
    if (user) {
      sendErrorResponse(
        res,
        HTTP_BAD_REQUEST,
        "Email " + email + " already in use."
      );

      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    const newUser: User = {
      userTypeId: "USER",
      name: name,
      surname: surname,
      email: email.toLowerCase(),
      phone: phone,
      address: address,
      password: encryptedPassword,
      balanceSheet: [],
      groups: [],
    };

    const dbUser = await UserModel.create(newUser);

    if (!dbUser) {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "Error creating user");

      return;
    }
    res.status(HTTP_OK).send(generateTokenResponse(dbUser));
    return;
  })
);
//----------Update user----------
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userTypeId, name, surname, email, phone, address, token } = req.body;

    if (!isValidObjectId(id)) {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "Invalid ID format");
      return;
    }
    const user = await UserModel.findById(id);
    if (!user) {
      sendErrorResponse(res, HTTP_NOT_FOUND, "User not found");
      return;
    }

    const userTypeExists = await UserTypeModel.findOne({ id: userTypeId });

    if (!userTypeExists) {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "No user type found");

      return;
    }

    user.userTypeId = userTypeId;
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.token = token;

    await user.save();
    res.status(HTTP_OK).send(user);
    return;
  })
);
//----------Delete User----------
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id });
    const { email, password } = req.body;

    if (!user) {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "No user found");
      return;
    }

    if (
      user &&
      (await bcrypt.compare(password, user.password)) &&
      user.email == email
    ) {
      await UserModel.deleteOne({ email: user.email });
      res.status(HTTP_OK).send("User successfully deleted");
      return;
    } else {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "Invalid username or password");

      return;
    }
  })
);
//----------Login----------
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      sendErrorResponse(
        res,
        HTTP_NOT_FOUND,
        "No user found with the mail " + email
      );

      return;
    }

      if (await bcrypt.compare(password, user.password)) {
        return res.status(HTTP_OK).send(generateTokenResponse(user));
      } else {
        return sendErrorResponse(
          res,
          HTTP_BAD_REQUEST,
          "Username or password are invalid"
        );
      }
  })
);
//----------Search by id----------
router.post(
  "/search-ID/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (id && isValidObjectId(id)) {
      const user = await UserModel.findOne({ _id: id });
      if (!user) {
        sendErrorResponse(
          res,
          HTTP_NOT_FOUND,
          "No user registered with that id"
        );

        return;
      }
      res.status(HTTP_OK).send(user);
      return;
    } else {
      sendErrorResponse(res, HTTP_NOT_FOUND, "Missing or incorrect data");
      return;
    }
  })
);
//----------Search by email----------
router.post(
  "/search-Email/:email",
  asyncHandler(async (req, res) => {
    const email = req.params.email;

    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        res.status(HTTP_OK).send(user);
        return;
      } else {
        sendErrorResponse(res, HTTP_NOT_FOUND, "No user found");

        return;
      }
    } else {
      sendErrorResponse(res, HTTP_NOT_FOUND, "Missing data");
      return;
    }
  })
);

const generateTokenResponse = (user: User) => {
  const token = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRATION || "30d" }
  );

  return {
    userTypeId: user.userTypeId,
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    address: user.address,
    id: user.id,
    token: token,
  };
};

function isValidObjectId(value: string): boolean {
  return mongoose.Types.ObjectId.isValid(value);
}

export default router;

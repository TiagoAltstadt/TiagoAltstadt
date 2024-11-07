const mongoose = require("mongoose");
import { Router } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user/user.model";
import {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_OK,
} from "../configs/http_status";
import bcrypt from "bcryptjs";
import { UserTypeModel } from "../models/user/user-type.model";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await UserModel.find();
    if (!users) {
      res.status(HTTP_BAD_REQUEST).send([]);
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
    console.log('req.body', req.body);  
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
      res.status(HTTP_BAD_REQUEST).send(errorMessage);
      return;
    }

    // Validate the user is not already registered
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(HTTP_BAD_REQUEST).send("Email " + email + " already in use.");
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      userTypeId: "USER",
      name: name,
      surname: surname,
      email: email.toLowerCase(),
      phone: phone,
      address: address,
      password: encryptedPassword,
    };

    const dbUser = await UserModel.create(newUser);

    if (!dbUser) {
      res.status(HTTP_BAD_REQUEST).send("Error creating user");
      return;
    }
    res.status(HTTP_OK).send(generateTokenResponse(dbUser));
    return;
  })
);

//----------Update user----------
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userTypeId, name, surname, email, phone, address } = req.body;

    if (!id || !isValidObjectId(id)) {
      res.status(HTTP_BAD_REQUEST).send("Invalid Id");
      return;
    }

    const user = await UserModel.findById(id);
    if (!user) {
      res.status(HTTP_BAD_REQUEST).send("Missing data");
      return;
    }

    const userTypeExists = await UserTypeModel.findOne({ id: userTypeId });

    if (!userTypeExists) {
      res.status(HTTP_BAD_REQUEST).send("User Type not found");
      return;
    }

    user.userTypeId = userTypeId;
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.phone = phone;
    user.address = address;

    await user.save();
    res.status(HTTP_OK).send("User updated successfully!");
    return;
  })
);
//----------Delete User----------
router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(HTTP_NOT_FOUND).send("No user found");
      return;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      await UserModel.deleteOne({ email: user.email });
      res.status(HTTP_OK).send("User successfully deleted");
      return;
    } else {
      res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
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
      res.status(HTTP_NOT_FOUND).send("No user found with the mail " + email);
      return;
    }

    if (await bcrypt.compare(password, user.password)) {
      res.status(HTTP_OK).send(generateTokenResponse(user));
      return;
    } else {
      res.status(HTTP_BAD_REQUEST).send("Username or password are invalid!");
      return;
    }
  })
);

//----------Search by id----------
router.post(
  "/searchById/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (id && isValidObjectId(id)) {
      const user = await UserModel.findOne({ _id: id });
      if (!user) {
        res.status(HTTP_NOT_FOUND).send("No user registered with that id");
        return;
      }
      res.status(HTTP_OK).send(user);
      return;
    } else {
      res.status(HTTP_BAD_REQUEST).send("Missing or incorrect data");
      return;
    }
  })
);
//----------Search by email----------
router.post(
  "/searchByEmail/:email",
  asyncHandler(async (req, res) => {
    const email = req.params.email;

    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        res.status(HTTP_OK).send(user);
        return;
      } else {
        res.status(HTTP_BAD_REQUEST).send("No user found");
        return;
      }
    } else {
      res.status(HTTP_BAD_REQUEST).send("Missing data");
      return;
    }
  })
);

const generateTokenResponse = (user: User) => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    "tiagoaltstadt",
    { expiresIn: "30d" }
  );

  return {
    userTypeId: user.userTypeId,
    name: user.name,
    surname: user.surname,
    email: user.email,
    phone: user.phone,
    address: user.address,
    password: user.password,
    token: token,
  };
};

function isValidObjectId(value: string): boolean {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;

  return (
    typeof value === "string" &&
    value.length === 24 &&
    objectIdRegex.test(value)
  );
}

export default router;

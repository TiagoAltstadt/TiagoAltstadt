const mongoose = require("mongoose");
import { Router } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user/user.model";
import nodemailer from "nodemailer";
import {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_OK,
  sendErrorResponse,
} from "../configs/http_status";
import bcrypt from "bcryptjs";
import { UserTypeModel } from "../models/user/user-type.model";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

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

    const confirmationCode = generateConfirmationCode();

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
      enabled: false,
      confirmationCode: confirmationCode,
    };

    const dbUser = await UserModel.create(newUser);

    if (!dbUser) {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "Error creating user");

      return;
    }
    res.status(HTTP_OK).send(generateTokenResponse(dbUser));

    // Use environment variables for sensitive information
    const myEmail = process.env.EMAIL;
    const myPassword = process.env.EMAIL_PASSWORD;
    const adminEmails = myEmail;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myEmail,
        pass: myPassword,
      },
    });

    // Confirmation Email
    let mailOptions = {
      from: myEmail,
      to: email,
      subject: "Tiago Altstadt - Creacion de usuario",
      html: `
      <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New User Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #ffffff;
            margin: 0;
            padding: 0;
            background-color: rgb(60, 60, 60);
        }

        a {
            color: #8bea22 !important;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: rgb(60, 60, 60);
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid #8bea22;
            box-shadow: 0px 15px 20px rgb(139, 234, 34, 0.4);

        }

        .email-header {
            background-color: #8bea22;
            color: rgb(0, 0, 0);
            text-align: center;
            padding: 20px 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
            line-height: 1.6;
            color: #ffffff;
        }

        .email-body b {
            color: #8bea22 !important;
        }

        .email-footer {
            background-color: rgb(75, 75, 75);
            text-align: center;
            padding: 15px 0;
            font-size: 14px;
            color: #969696;
            border-top: 1px solid #ddd;
        }

        .email-footer a {
            color: #8bea22 !important;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            Confirm your account
        </div>
        <div class="email-body">
            <p>You have created a new user at <a href="https://www.tiagoaltstadt.com/"
                    target="_blank">www.tiagoaltstadt.com</a>.</p>
            <p>
                <b>Name:</b> ${name}<br>
                <b>Surname:</b> ${surname}<br>
                <b>Email:</b> ${email}<br>
                <b>Phone:</b> ${phone}<br>
                <b>Address:</b> ${address}
            </p>
            <p>Click <a href="https://www.tiagoaltstadt.com/confirmation/${email}/${confirmationCode}"><b>here</b></a> to confirm your account.</p>
            <p>Best regards,<br><b>Tiago Altstadt</b></p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Tiago Altstadt. All rights reserved.</p>
            <p>
                Learn more at <a href="https://www.tiagoaltstadt.com/" target="_blank">www.tiagoaltstadt.com</a>
            </p>
        </div>
    </div>
</body>

</html>
      `,
    };
    transporter.sendMail(
      mailOptions,
      (error: any, info: { response: string }) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: "Error sending email." });
        } else {
          console.log("Email sent: " + info.response);
          res.status(HTTP_OK).json({ message: "Email sent successfully." });
        }
      }
    );

    return;
  })
);

function generateConfirmationCode(length = 6) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
//----------Confirm----------
router.post(
  "/confirmation",
  asyncHandler(async (req, res) => {
    const { email, confirmationCode } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      sendErrorResponse(
        res,
        HTTP_NOT_FOUND,
        "No user found with the mail " + email
      );

      return;
    }

    if (user.confirmationCode === confirmationCode) {
      user.enabled = true;
      await user.save();
      res.status(HTTP_OK).json({ messge: "User confirmed successfully" });
      
      // Use environment variables for sensitive information
      const myEmail = process.env.EMAIL;
      const adminEmails = myEmail;
      const myPassword = process.env.EMAIL_PASSWORD;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: myEmail,
          pass: myPassword,
        },
      });

      // Admin Email
      let mailOptions = {
        from: myEmail,
        to: adminEmails,
        subject: "Tiago Altstadt - Creacion de usuario",
        html: `
        
<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New User Notification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #ffffff;
                    margin: 0;
                    padding: 0;
                    background-color: rgb(60, 60, 60);
                }
        
                a {
                    color: #8bea22 !important;
                }
        
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: rgb(60, 60, 60);
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    border: 1px solid #8bea22;
                    box-shadow: 0px 15px 20px rgb(139, 234, 34, 0.4);
        
                }
        
                .email-header {
                    background-color: #8bea22;
                    color: rgb(0, 0, 0);
                    text-align: center;
                    padding: 20px 0;
                    font-size: 24px;
                }
        
                .email-body {
                    padding: 20px;
                    line-height: 1.6;
                    color: #ffffff;
                }
        
                .email-body b {
                    color: #8bea22 !important;
                }
        
                .email-footer {
                    background-color: rgb(75, 75, 75);
                    text-align: center;
                    padding: 15px 0;
                    font-size: 14px;
                    color: #969696;
                    border-top: 1px solid #ddd;
                }
        
                .email-footer a {
                    color: #8bea22 !important;
                    text-decoration: none;
                }
            </style>
        </head>

        <body>
            <div class="email-container">
                <div class="email-header">
                    New User Created
                </div>
                <div class="email-body">
                    <p>A new user has been created on <a href="https://www.tiagoaltstadt.com/"
                            target="_blank">www.tiagoaltstadt.com</a>.</p>
                    <p>
                        <b>Nombre:</b> ${user.name}<br>
                        <b>Apellido:</b> ${user.surname}<br>
                        <b>Email:</b> ${user.email}<br>
                        <b>Telefono:</b> ${user.phone}<br>
                        <b>Direccion:</b> ${user.address}
                    </p>
                    <p>Best regards,<br><b>Tiago Altstadt</b></p>
                </div>
                <div class="email-footer">
                    <p>&copy; 2024 Tiago Altstadt. All rights reserved.</p>
                    <p>
                        Visit us at <a href="https://www.tiagoaltstadt.com/" target="_blank">www.tiagoaltstadt.com</a>
                    </p>
                </div>
            </div>
        </body>

        </html>
        `,
      };
      transporter.sendMail(
        mailOptions,
        (error: any, info: { response: string }) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: "Error sending email." });
          } else {
            console.log("Email sent: " + info.response);
            res.status(HTTP_OK).json({ message: "Email sent successfully." });
          }
        }
      );

      // Client Email
      mailOptions = {
        from: myEmail,
        to: email,
        subject: "Tiago Altstadt - Creacion de usuario ",
        html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New User Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #ffffff;
            margin: 0;
            padding: 0;
            background-color: rgb(60, 60, 60);
        }

        a {
            color: #8bea22 !important;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: rgb(60, 60, 60);
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            border: 1px solid #8bea22;
            box-shadow: 0px 15px 20px rgb(139, 234, 34, 0.4);

        }

        .email-header {
            background-color: #8bea22;
            color: rgb(0, 0, 0);
            text-align: center;
            padding: 20px 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
            line-height: 1.6;
            color: #ffffff;
        }

        .email-body b {
            color: #8bea22 !important;
        }

        .email-footer {
            background-color: rgb(75, 75, 75);
            text-align: center;
            padding: 15px 0;
            font-size: 14px;
            color: #969696;
            border-top: 1px solid #ddd;
        }

        .email-footer a {
            color: #8bea22 !important;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            User Created
        </div>
        <div class="email-body">
            <p>Welcome to <a href="https://www.tiagoaltstadt.com/" target="_blank">www.tiagoaltstadt.com</a>!</p>
            <p>Your account has been successfully created</p>
            <p>
                <b>Name:</b> ${user.name}<br>
                <b>Surname:</b> ${user.surname}<br>
                <b>Email:</b> ${user.email}<br>
                <b>Phone:</b> ${user.phone}<br>
                <b>Address:</b> ${user.address}
            </p>
            <p>Exitos,<br><b>Tiago Altstadt</b></p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Tiago Altstadt. All rights reserved.</p>
            <p>
                Learn more at <a href="https://www.tiagoaltstadt.com/" target="_blank">www.tiagoaltstadt.com</a>
            </p>
        </div>
    </div>
</body>

</html>`,
      };
      transporter.sendMail(
        mailOptions,
        (error: any, info: { response: string }) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: "Error sending email." });
          } else {
            console.log("Email sent: " + info.response);
            res.status(HTTP_OK).json({ message: "Email sent successfully." });
          }
        }
      );

      return;
    } else {
      sendErrorResponse(res, HTTP_BAD_REQUEST, "Invalid confirmation code");
      return;
    }
  })
);
//----------Update user----------
router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userTypeId, name, surname, email, phone, address, token } =
      req.body;

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

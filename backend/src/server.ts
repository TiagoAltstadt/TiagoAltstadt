import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import cors from "cors";
import yomeRouter from "./routers/yome.router";
import userRouter from "./routers/user.router";
import familyTreeRouter from "./routers/familyTree.router";
import userTypeRouter from "./routers/user-type.router";
import { dbConnect } from "./configs/database.config";
dbConnect();

const schedule = require("node-schedule");

const rule = new schedule.RecurrenceRule();
rule.second = 5;
// const job = schedule.scheduleJob(rule, () => {
//   console.log('Holanda');
// });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/users", userRouter);
app.use("/api/userTypes", userTypeRouter);
app.use("/api/yome", yomeRouter);
app.use("/api/familyTree", familyTreeRouter);

app.get("/api", (req, res) => {
  res.json("Hello World!");
});

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.clear();
  if (port && +port == 5000) {
    console.log(" ____________________________________________________");
    console.log("|                 Tiago Altstadt                     |");
    // console.log("|....................................................|");
    console.log(
      "|  Backend \u001b[1;32m running \u001b[0m on http://localhost:" +
        port +
        "        |"
    );
  } else {
    console.log(
      " __________________________________________________________________"
    );

    console.log(
      "|                 Tiago Altstadt                                   |"
    );
    console.log(
      "| Backend \u001b[1;32m running \u001b[0m on https://tiagoaltstadt.herokuapp.com          |\n|           or http://tiagoaltstadt.com (port = " +
        port +
        ")          |"
    );
    console.log(
      "|__________________________________________________________________|"
    );
  }
});

import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import cors from "cors";
import userRouter from "./routers/user.router";
import { dbConnect } from "./configs/database.config";
dbConnect();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/users", userRouter);

app.get("/api", (req, res) => {
  res.send("Hello World!");
  
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

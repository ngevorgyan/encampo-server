import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import connectMongoDB from "./db/connectMongoDB.js";
// import { checkAuthentication } from "./middlewhere/checkAuthentication.js";
import path from "path";
import usersRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import homeRoute from "./routes/backoffice/home.route.js";
import "./passport/google.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors({ origin: "*" }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", usersRoute);
app.use("/auth", authRoute);
app.use("/home", homeRoute);
// app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.send("<div><a href='http://localhost:3002/auth/google'>Gmail</a></div>");
});

// app.use(checkAuthentication);

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
  connectMongoDB();
});

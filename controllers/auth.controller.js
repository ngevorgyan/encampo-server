import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { sendMail } from "../services/mailer.js";
import jwt from "jsonwebtoken";

export const userReg = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const haveUser = await User.findOne({ email });
    if (haveUser) {
      console.log(haveUser);
      return res
        .status(409)
        .send("Этот адрес электронной почты уже используется.");
    }

    const user = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      password: hashedPwd,
    };

    const newUser = await User.create(user);
    sendMail(email, password);
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

    res.status(201).json({ user, token });
  } catch (err) {
    // console.error("Error occurred:", err.errors);
    // const error = new Error("Error occurred");
    // let keys = Object.keys(err.errors);
    res.status(422).send(err.message);
  }
};

export const googleReg = async (req, res) => {
  const { name, id, emails } = req.user;
  console.log("---------------");
  const email = emails[0].value;

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      const hashedPwd = await bcrypt.hash(id, 10);

      const user = {
        id: Date.now(),
        firstName: name.familyName,
        lastName: name.givenName,
        email,
        password: hashedPwd,
      };
      console.log(user);
      const newUser = await User.create(user);
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

      return res.status(201).json({ user, token });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    return res.status(201).json({ user, token });
  } catch (err) {
    // console.error("Error occurred:", err.errors);
    // const error = new Error("Error occurred");
    // let keys = Object.keys(err.errors);
    res.status(422).send(err.message);
  }
};

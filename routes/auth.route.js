import express from "express";
import passport from "passport";
import { userReg, googleReg } from "../controllers/auth.controller.js";
import "../passport/local.js";
import "../passport/google.js";

const router = express.Router();

router.post("/register", userReg);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    // console.log("test", user);
    if (err) {
      return next(err);
    }
    if (!user) {
      thy;
      return res.status(401).json({ message: info.message });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      const token = user.generateAuthToken();
      return res.json({ user, token });
    });
  })(req, res, next);
});

//gmail signin or ginup

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    console.log("tapem bernit mej");
  }
);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/google",
    successRedirect: "/auth/protected",
  }),
  googleReg
);

router.get("/protected", isLoggedIn, (req, res) => {
  console.log("hasanq text");
  let name = req.user.displayName;

  res.redirect(`http://localhost:3000?${name}`);
});

export default router;

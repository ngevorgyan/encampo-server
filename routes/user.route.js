import express from "express";
import { getUserProfile } from "../controllers/user.controller.js";
import { checkAuthentication } from "../middlewhere/checkAuthentication.js";

const router = express.Router();

router.post("/profile/:username", checkAuthentication, getUserProfile);

export default router;

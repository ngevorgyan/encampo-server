import express from "express";
import {
  getCamps,
  createCamp,
  updateCamp,
} from "../../controllers/backoffice/camp.controller.js";

const router = express.Router();

//camps
router.get("/camps", getCamps);
router.post("/camp", createCamp);
router.delete("/camp:id", updateCamp);
router.post("/camp:id", updateCamp);

export default router;

import express from "express";
import {
  createCountry,
  getCountries,
  createCity,
} from "../../controllers/backoffice/country.controller.js";

const router = express.Router();

//countries
router.get("/country", getCountries);
router.post("/city", createCity);
router.post("/country", createCountry);

export default router;

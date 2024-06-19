import Country from "../../models/country.model.js";
import City from "../../models/city.model.js";

export const createCountry = async (req, res) => {
  const { countryName } = req.body;

  try {
    const model = await (
      await Country.create({ name: countryName })
    ).populate("cities");
    res.status(201).json(model);
  } catch (err) {
    console.log("====createCountry", err.message);
  }
};

export const getCountries = async (_, res) => {
  try {
    const countries = await Country.find({}).populate("cities");

    res.status(200).json(countries);
  } catch (err) {
    console.log("===getCountries", err.message);
  }
};

export const createCity = async (req, res) => {
  const { name, countryId } = req.body;

  try {
    const country = await Country.findOne({ _id: countryId });
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    const city = new City({ name, country: country._id });
    await city.save();

    country.cities = [...country.cities, city];
    // country
    await country.save();

    res.status(201).json(city);
  } catch (err) {
    console.log("====createCity", err.message);
  }
};

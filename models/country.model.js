import mongoose from "mongoose";
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: { type: String, required: true, unique: true },
  cities: [{ type: Schema.Types.ObjectId, ref: "City" }],
});

export default mongoose.model("Country", countrySchema);

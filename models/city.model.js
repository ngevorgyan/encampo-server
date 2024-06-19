import mongoose from "mongoose";
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: "Country" },
});

export default mongoose.model("City", citySchema);

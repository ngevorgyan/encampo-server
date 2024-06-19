import mongoose from "mongoose";
const Schema = mongoose.Schema;

const campSchema = new Schema({
  name: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: "Country" },
  city: { type: Schema.Types.ObjectId, ref: "City" },
  image: { type: String, default: "" },
  isBitch: { type: Boolean, default: false },
  isSport: { type: Boolean, default: false },
  isGroup: { type: Boolean, default: false },
  isFamely: { type: Boolean, default: false },
  isLanguage: { type: Boolean, default: false },
  description: { type: String, required: true },
  locationInfo: { type: String, required: true },
  videos: [{ type: String, required: true }],
  programs: { type: Schema.Types.ObjectId, ref: "Comp" },
});

export default mongoose.model("Camp", campSchema);

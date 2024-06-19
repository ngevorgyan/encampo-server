import mongoose from "mongoose";
const Schema = mongoose.Schema;

const campProgramsSchema = new Schema({
  price: { type: Number, required: true },
  currency: { type: Number, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  dateStart: { type: String, required: true },
  dateEnd: { type: String, required: true },
  title: { type: String, required: true },
  leasonDedline: { type: String, required: true },
});

export default mongoose.model("CampProgram", campProgramsSchema);

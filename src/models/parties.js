import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PartiesSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    max: 60
  },
  abbr: {
    type: String,
    require: true,
    trim: true,
    max: 8
  },
})

export default mongoose.model("parties", PartiesSchema);
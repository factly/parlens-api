import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ConstituenciesSchema = new Schema({
  name: {
    type: String,
    default: null,
    trim: true,
    max: 25
  },
  state: {
    type: String,
    require: true,
    trim: true,
    max: 200
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    default: null
  },
  pincodes: {
    type: [Number],
    default: []
  }
})

export const Constituencies = mongoose.model("constituencies", ConstituenciesSchema);
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WinnerSchema = new Schema({
  party: {
    type: Schema.Types.ObjectId,
    ref: 'parties' 
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'constituencies'
  },
  type: {
    type: String,
    enum: ['loksabha', 'rajyasaba'],
    required: true
  },
  session: {
    type: Number,
    require: true,
  },
})

const MembersSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    max: 200
  },
  gender: {
    type: String,
    require: true,
    trim: true,
    max: 11,
    enum: ['male', 'female', 'third']
  },
  dob: {
    type: Date
  },
  birth_place: {
    type: String,
    trim: true,
    max: 100
  },
  marital_status: {
    type: String,
    trim: true,
    max: 10
  },
  sons: {
    type: Number,
    default: null
  },
  daughters: {
    type: Number,
    default: null
  },
  education: {
    type: String,
    trim: true,
    max: 20
  },
  profession: {
    type: [String],
    default: []
  },
  wins: {
    type: [WinnerSchema],
    minlength: 1
  }
})

export const Members = mongoose.model("members", MembersSchema);
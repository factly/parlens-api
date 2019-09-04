import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
  subject: {
    type: String,
    require: true,
    trim: true,
    max: 200
  },
  type: {
    type: Boolean,
    require: true 
  },
  question: {
    type: String,
    require: true,
    trim: true,
    max: 2000
  },
  asked: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Members'
    }],
    required: true,
    minlength: 1
  },
  answer: {
    type: String,
    require: true,
    trim: true,
    max: 2000
  },
  ministry: {
    type: String,
    require: true,
    trim: true,
    max: 200
  },
  date: {
    type: Date
  }
})

export const Questions = mongoose.model("Questions", QuestionsSchema);
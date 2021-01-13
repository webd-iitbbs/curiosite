const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../mongoose");

const AnswerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  question: { type: Schema.Types.ObjectId, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  noOfUpvotes: { type: Number, default: 0 },
  noOfDownvotes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId }],
});

const Answer = connection.model("question", AnswerSchema);

module.exports = Answer;

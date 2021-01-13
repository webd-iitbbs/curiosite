const mongoose = require("mongoose");
const connection = require("../../db/mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(connection);

const QuestionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  question: { type: String, required: true },
  uniqueId: { type: Number ,required: true},
  createdAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  isAnswered: { type: Boolean, default: false },
  answers: [{ type: Schema.Types.ObjectId }],
});

QuestionSchema.plugin(autoIncrement.plugin, {
  model: "question",
  field: "uniqueId",
  startAt: 1,
  incrementBy: 1,
});

const Question = connection.model("question", QuestionSchema);

module.exports = Question;

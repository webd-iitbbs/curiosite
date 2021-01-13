const express = require("express");
const router = express.Router();

const Answer = require("../../db/models/answer");
const Question = require("../../db/models/question");
const User = require("../../db/models/user");

router.post("/answer", async (req, res) => {
  try {
    const userObjectId = await getUserId(req.body.email);
    const questionObjectId = await getQuestionId(req.body.uniqueId);
    const newAnswer = new Answer({
      answer: req.body.answer,
      user: userObjectId,
      question: questionObjectId,
    });
    newAnswer.save();
    updateQuestion(questionObjectId, newAnswer._id);
    res.status(201).send({ newAnswer });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

async function getUserId(email) {
  const user = await User.findOne({
    email,
  });
  return user._id;
}

async function getQuestionId(uniqueId) {
  const question = await Question.findOne({
    uniqueId,
  });
  return question._id;
}

async function updateQuestion(questionId, answerId) {
  const question = await Question.findById(questionId);
  const answers = question.answers;
  answers.push(answerId);
  question.answers = answers;
  question.isAnswered = true;
  question.save();
}

module.exports = router;

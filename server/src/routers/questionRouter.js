const express = require("express");
const Question = require("../../db/models/question");
const User = require("../../db/models/user");

const router = new express.Router();

router.post("/question", async (req, res) => {
  try {
    const userObjectId = await getUserId(req.body.email);
    const newQuestion = new Question({
      question: req.body.question,
      user: userObjectId,
      tags: req.body.tags,
    });
    newQuestion.save();
    res.status(201).send({ question: newQuestion });
    console.log({ question: newQuestion });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

async function getUserId(email) {
  const user = await User.findOne({
    email: email,
  });
  return user._id;
}

async function createQuestion(req, userObjectId) {
  return await new Question({
    question: req.body.question,
    user: userObjectId,
    tags: req.body.tags,
  });
}

module.exports = router;

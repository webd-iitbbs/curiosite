const express = require("express");
const Question = require("../../db/models/question");
const User = require("../../db/models/user");
// const { getUserId } = require("./getFunctions");

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
    console.log(e);
  }
});

async function getUserId(email) {
  const user = await User.findOne({
    email,
  });
  return user._id;
}

module.exports = router;

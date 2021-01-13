const express = require('express');
const router = express.Router();

router.post('/answer', (req, res) => {
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
})
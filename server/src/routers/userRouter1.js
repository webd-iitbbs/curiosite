const express = require("express");
const googleAuth = require("../middleware/googleAuth");
const User = require("../../db/models/user");

const router = new express.Router();

router.post("/googleAuth", async (req, res) => {
  const requiredUser = req.body;
  try {
    const user = await User.findOne({
      firstName: requiredUser.firstName,
      lastName: requiredUser.lastName,
      email: requiredUser.email,
    });
    if (user) {
      res.status(200).send({ user });
    } else {
      const newUser = new User(requiredUser);
      newUser.save();
      res.status(201).send({ user: newUser });
    }
  } catch (e) {
    res.status(500).send({
      error: e,
    });
  }
});

module.exports = router;
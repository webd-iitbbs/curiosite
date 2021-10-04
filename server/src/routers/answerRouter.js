const express = require("express");
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID
const router = express.Router();

const Answer = require("../../db/models/answer");
const User = require("../../db/models/user");
const googleAuth = require('../middleware/googleAuth')


router.post("/answer", googleAuth, async (req, res) => {
        const { answer: content, question: questionObjectIdStr } = req.body
        try {
                const userObjectId = await getUserId(req.body.email);
                const questionObjectId = mongoose.Types.ObjectId(questionObjectIdStr)
                const newAnswer = new Answer({
                        author: userObjectId,
                        content,
                        question: questionObjectId 
                });
                newAnswer.save();
                res.status(201).send({
                        answer: newAnswer
                });
        } catch (e) {
                res.status(500).send({ error: e });
        }
});

router.patch('/upvote', googleAuth, async (req, res) => {
        const { answers: answerObjectIdStrArr} = req.body
        const answersArr = []
        answerObjectIdStrArr.forEach(id => {
            answersArr.push(mongoose.Types.ObjectId(id))
        });
        try{
                const userObjectId = await getUserId(req.body.email)
                const allAnswers = await Answer.updateMany(
                    {
                        _id: { $in: answersArr },
                        upvotes: { $not: { $in: [userObjectId] } }
                    },{
                        $push: { upvotes: userObjectId },
                        $pull: { downvotes: userObjectId }
                    },
                    { upsert: true }
                )
                res.send({
                    upvoteActionStatus: true
                })
        }catch(e){
                res.send({ error: e })
        }
})

router.patch('/downvote', googleAuth, async (req, res) => {
        const { answers: answerObjectIdStrArr} = req.body
        const answersArr = []
        answerObjectIdStrArr.forEach(id => {
            answersArr.push(mongoose.Types.ObjectId(id))
        });
        try{
                const userObjectId = await getUserId(req.body.email)
                const allAnswers = await Answer.updateMany(
                    {
                        _id: { $in: answersArr },
                        downvotes: { $not: { $in: [userObjectId] } }
                    },{
                        $push: { downvotes: userObjectId },
                        $pull: { upvotes: userObjectId }
                    },
                    { upsert: true }
                )
                res.send({
                    downvoteActionStatus: true
                })
        }catch(e){
                res.send({ error: e })
        }
})

async function getUserId(email) {
        const user = await User.findOne({
                email
        });
        return user._id;
}

async function getQuestionId(uniqueId) {
        const question = await Question.findOne({
                uniqueId,
        });
        return question._id;
}

module.exports = router;

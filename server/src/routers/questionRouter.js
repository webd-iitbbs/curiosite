const express = require("express");
const { populate } = require("../../db/models/question");
const Question = require("../../db/models/question");
const User = require("../../db/models/user");
const googleAuth = require('../middleware/googleAuth')

const router = new express.Router();

router.post("/question", googleAuth, async (req, res) => {
  try {
        const userObjectId = await getUserId(req.body.email);
        const newQuestion = new Question({
                content: req.body.question,
                author: userObjectId,
                tags: req.body.tags
        });
        newQuestion.save();
        res.status(201).send({ question: newQuestion });

  } catch (e) {
        res.status(500).send({ error: e });
  }
});

router.get('/home_questions', googleAuth, async (req, res) => {
        try{
                const { limit: limitStr, date: dateStr } = req.query
                const limit = parseInt(limitStr)
                const date = parseInt(dateStr)
                const questionList = await Question.find({
                        creationTime: { $lt: date }
                }).sort({
                        creationTime: -1
                }).limit(limit).populate('author')
                const totalQuestionListSaturated = questionList.length !== limit
                res.send({ questionList, totalQuestionListSaturated })

        }catch(e){
                res.status(404).send({ error: e })
        }
})

router.post('/follows_questions', googleAuth, async (req, res) => {
        try{
                const limit = parseInt(req.query.limit)
                const { skip: skipStr, date: dateStr } = req.query
                var date = parseInt(dateStr)
                const skip = parseInt(skipStr)
                const { tagsQuestionListSaturated: isTagListSaturated } = req.body
                // Fetch user
                const currentUser = req.user
                const user = await User.findOne({
                    email: currentUser.email
                })
                if(!user)
                    throw new Error('User not found in database')
                const tags = user.tags
                var questionList = []
                if((isTagListSaturated !== true)&&(tags.length !== 0))
                {
                        questionList = await Question.find({
                                tags: { $elemMatch: { $in: tags } },
                                creationTime: { $lt: date }   
                        }).sort({
                                creationTime: -1
                        }).limit(limit).populate('author')
                }
                /* skip value to not be computed. Status of tag question saturation sent to React to decide
                skip value will decide the usage of skip */
                const questionListLength = questionList.length
                const tagsQuestionListSaturated = (tags.length !== 0) && (questionListLength !== limit)

                if(questionListLength < limit)
                {
                        if(isTagListSaturated === false && tags.length !== 0)
                            date = new Date().getTime()
                        const otherQuestionList = await Question.find({
                                creationTime: { $lt: date },
                                tags: {$not: { $elemMatch: { $in: tags } }}
                        }).sort({
                                creationTime: -1
                        }).limit(limit-questionListLength).populate('author')
                        questionList = questionList.concat(otherQuestionList)
                }

                const totalQuestionListSaturated = questionList.length !== limit

                res.status(200).send({
                        questionList,
                        tagsQuestionListSaturated,
                        totalQuestionListSaturated
                })

        }catch (e){
                res.status(404).send({error: e})
        }
})

router.post('/tag_questions', googleAuth, async (req, res) => {
        const {limit: limitStr, date:dateStr} = req.query
        const tags = req.body.tags
        try{
                const limit = parseInt(limitStr)
                const date = parseInt(dateStr)
                const questionList = await Question.find({
                    tags: { $elemMatch: { $in: tags } },
                        creationTime: { $lt: date }
                }).limit(limit).sort({
                        creationTime: -1
                }).populate('author')
                const questionListSaturated = questionList.length !== limit
                res.send({
                        questionList,
                        questionListSaturated
                })

        }catch(e){
                res.status(404).send({ error: e })
        }
})

router.get('/trending_questions', googleAuth, async (req, res) => {
        try{
                const questionList = await Question.find({}).sort({
                        bloomIndex: -1
                }).limit(5).sort({
                        createdAt: -1
                }).populate('author')
                res.send({ questionList })

        }catch(e){
                res.status(500).send({ error: e })
        }
})

router.get('/unanswered_question', googleAuth, async (req, res) => {
        try{
                var questionList = await Question.find({
                        isAnswered: false
                }).populate('author')
                const numQuestions = questionList.length
                if(numQuestions !== 0)
                {
                        const randIndex = generateRandNum(numQuestions)
                        const question = questionList[randIndex]
                        res.send({ question })
                }
                else
                {
                        questionList = await Question.find({}).sort({
                                createdAt: -1
                        }).limit(1).populate('author')
                        const question = questionList[0]
                        res.send({ question })
                }
        }catch(e){
                res.status(500).send({ error: e })
        }
})

router.get('/question_answers', googleAuth, async (req, res) => {
    try{
        const userId = await getUserId(req.user.email)
        const questionId = req.query.id
        const reqQuestion = await Question.findById(questionId).populate({
            path: 'answers',
            populate: {
                path: 'author'
            }
        })
        const answersUpvoted = [], answersDownvoted = []
        reqQuestion.answers.forEach(answer => {
            if(answer.upvotes.indexOf(userId) !== -1)
                answersUpvoted.push(answer._id)
            if(answer.downvotes.indexOf(userId) !== -1)
                answersDownvoted.push(answer._id)    
        });
        res.send({
            answers: reqQuestion.answers,
            answersUpvoted,
            answersDownvoted
        })

    }catch(e){
        res.status(404).send({ error: e })
    }
})

async function getUserId(email) {
  const user = await User.findOne({
    email,
  });
  return user._id;
}

const generateRandNum = upperLimit => {
        const initRandFloat = Math.random()
        const result = Math.floor(upperLimit * initRandFloat)
        return result
}

module.exports = router;

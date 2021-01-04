const express = require('express')
const cors = require('cors')

require('../db/mongoose')
const userRouter = require('./routers/userRouter')

const app = express()

app.use(express.json())
app.use(cors())
app.use(userRouter)

const port = 5000

app.listen(port, () => {
        console.log('Listening on port ' + port)
})
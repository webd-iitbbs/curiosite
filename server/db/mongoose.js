const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/quora_db',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
})
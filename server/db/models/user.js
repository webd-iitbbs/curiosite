const mongoose = require('mongoose')

const validator = require('validator')
const connection = require('../mongoose')

const userSchema = new mongoose.Schema({
        firstName:{
                type: String,
                required: true
        },
        lastName:{
                type: String,
                required: true
        },
        email:{
                type: String,
                required: true,
                validate(value){
                        if(!validator.isEmail(value))
                                throw new Error('Invalid email!')
                }
        },
        tags:{
                type: [String],
                default: []
        }
})

//Pre method for password to be added if needed
//Pre method for tags to be added to verify correctness

const User = connection.model('User', userSchema)

module.exports = User
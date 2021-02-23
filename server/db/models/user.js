const mongoose = require('mongoose')

const validator = require('validator')
const connection = require('../mongoose')

const userSchema = new mongoose.Schema({
        firstName:{
                type: String,
<<<<<<< HEAD
=======
                trim: true,
>>>>>>> 9435383f3a8eb7187e6ac14961e541eb1669610d
                required: true
        },
        lastName:{
                type: String,
<<<<<<< HEAD
=======
                trim: true,
>>>>>>> 9435383f3a8eb7187e6ac14961e541eb1669610d
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
        //Add ratings field if necessary
},{
        //For dev purposes
        timestamps: true
})

//Pre method for password to be added if needed
//Pre method for tags to be added to verify correctness

const User = connection.model('User', userSchema)

module.exports = User
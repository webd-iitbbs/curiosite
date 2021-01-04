const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
        firstName:{
                type: String,
                required: true,
                trim: true,
                validate(value){
                        if(value === '')
                                throw new Error('First name cant be empty!')
                        if(!validator.isAlpha(value))
                                throw new Error('First name must only have alphabets!')
                }
        },
        lastName:{
                type: String,
                required: true,
                trim: true,
                validate(value){
                        if(value === '')
                                throw new Error('Last name cant be empty!')
                        if(!validator.isAlpha(value))
                                throw new Error('Last name must only have alphabets!')
                }
        },
        email:{
                type: String,
                required: true,
                validate(value){
                        if(validator.isEmail(value))
                                throw new Error('Invalid email!')
                }
        },
        password:{
                type: String,
                required: false,        //Can be made mandatory for in-built login/signup
        },
        tags:{
                type: [String],
                default: []
        }
})

//Pre method for password to be added if needed
//Pre method for tags to be added to verify correctness

const User = new mongoose.model('User', userSchema)

module.exports = User
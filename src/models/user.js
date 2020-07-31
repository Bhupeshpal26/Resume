import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { strict } from 'assert';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 50,
        required: 'name can not be blank'
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Invalid Email')
                
            }
            
        }
    },

    username:{
        type: String,
        required: [true,'Username can\'t be blank'],
        unique: true,
        trim: true,
        minlength: 8,
        maxlength: 16,
        validate(value){
            if (!validator.isAlphanumeric(value)){
                throw new Error('Invalid username')
            }
        }
    },

    dateOfBirth: {
        type: Date,
        required: true,
        max: Date.now
    },

    password: {
        type: String,
        required: [true,'password can\'t be blank'],
        unique: true,
        trim: true,
        minlength: 8,
        maxlength: 16,
        validate(value){
            if (!validator.isAlphanumeric(value)){
                throw new Error('Invalid password')
            }
        }
    },

    tokens: [{

        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.post('save', function(error, doc, next) {

    // if (error.name === 'MongoError' && error.code === 11000) {
    //     console.log("hhAHAAA",error.keys)
    //   next(new Error('email must be unique'));
    // } else {
    //   next(error);
    // }

    if (error.name === 'ValidationError') {
        //const error = {};
        const keys = Object.keys(error.errors);
        console.log('keys',keys)
        keys.forEach((key) => {
            let message = error.errors[key].message;
            console.log('message',message)

            if (error.errors[key].properties && error.errors[key].properties.message) {
                console.log('message2',error.errors[key].properties.message)
                message = error.errors[key].properties.message.replace('`{PATH}`', key);
                console.log('message3',message)
            }
        })
        // console.log("oooo",error.message,"hhhhh",error.errors.password.kind,"klsdss",error.errors)
         next()
    }

  });

//userSchema.plugin(uniqueValidator,{message: '{PATH} exists' });
const User = mongoose.model('User', userSchema)

module.exports = User
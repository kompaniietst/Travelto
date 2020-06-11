const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const amenitySchema = mongoose.Schema({
    label: {
        type: String,
        trim: true
    },
    checked: {
        type: Boolean,
    },
    image: {
        type: String,
        trim: true
    }
})

// amenitySchema.pre('save', async function (next) {
//     // Hash the password before saving the user model 
//     const amenity = this

   
//     next()
// })


const Amenity = mongoose.model('Amenity', amenitySchema)

module.exports = Amenity
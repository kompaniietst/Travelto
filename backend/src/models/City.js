const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const citySchema = mongoose.Schema({
    label: {
        type: String,
        trim: true
    }
})

citySchema.pre('save', async function (next) {
    // Hash the password before saving the user model 
    const city = this

    // if (user.isModified('password')) {
    //     user.password = await bcrypt.hash(user.password, 8)
    // }
    next()
})

const City = mongoose.model('City', citySchema)

module.exports = City
const mongoose = require('mongoose')
// const validator = require('validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const roomSchema = mongoose.Schema({
    // hotel_info: {
    //     _id: {
    //         type: mongoose.Schema.ObjectId,
    //         trim: true
    //     },
    //     label: {
    //         type: String,
    //         trim: true
    //     }
    // },
    hotel_id: {
        type: mongoose.Schema.ObjectId,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        trim: true
    },
    specials: [],
    images: [],
    textFeatures: []
    // amenities: [{ type: mongoose.Schema.ObjectId }]
})

roomSchema.pre('save', async function (next) {
    // Hash the password before saving the user model 
    const room = this

    // if (user.isModified('password')) {
    //     user.password = await bcrypt.hash(user.password, 8)
    // }
    next()
})

// hotelSchema.methods.generateAuthToken = async function () {
//     // Generate an auth token for the user 
//     const user = this

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)

//     user.tokens = user.tokens.concat({ token })
//     await user.save()
//     return token
// }

// hotelSchema.statics.findByCredentials = async (email, password) => {
//     // Search for a user by email and password. 
//     const user = await User.findOne({ email })

//     const hashed = await bcrypt.hash(password, 8)

//     if (!user) { throw new Error('Invalid login credentials') }
//     const isPasswordMatch = await bcrypt.compare(password, user.password)

//     if (!isPasswordMatch) {
//         throw new Error('Invalid login credentials')
//     }
//     return user
// }

// hotelSchema.methods.uploadImageF = function () {
//     return multer({
//         storage: multer.diskStorage({
//             destination: function (req, file, cb) {
//                 cb(null, './uploads/hotels/')
//             },
//             filename: function (req, file, cb) {
//                 cb(null, Date.now() + file.originalname)
//             }
//         })
//     }).array('files')
// }

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
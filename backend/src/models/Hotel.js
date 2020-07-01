const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    stars: {
        type: Number,
    },
    description: {
        type: String,
        trim: true
    },
    address: {
        city: {
            _id: {
                type: mongoose.Schema.ObjectId,
            },
            label: {
                type: String,
                trim: true
            }
        },
        street: {
            type: String,
            trim: true
        },
        houseNumber: {
            type: String,
            trim: true
        },
        disctrict: {
            type: String,
            trim: true
        },
        map: [0, 0],
    },
    images: [],
    amenities: [],
    creator: {
        type: mongoose.Schema.ObjectId,
        trim: true
    },

})

hotelSchema.pre('save', async function (next) {
    // Hash the password before saving the user model 
    const hotel = this

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

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel
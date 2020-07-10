const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    room_id: {
        type: String,
        trim: true
    },
    room_name: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    date: [],
    nights: {
        type: Number
    },
    pex: {
        adults: {
            type: Number
        },
        children: {
            type: Number
        },
        ages: []
    },
    owner_id: {
        type: mongoose.Schema.ObjectId,
    },
    hotel: {
        _id: {
            type: mongoose.Schema.ObjectId,
        },
        label: {
            type: String,
            trim: true
        },
        stars: {
            type: Number
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
        }
    },
    clientId: {
        type: mongoose.Schema.ObjectId,
    },
    status: {
        type: String,
        trim: true
    },
    reserved: { type: Date, default: Date.now }
})

bookingSchema.pre('save', async function (next) {
    // Hash the password before saving the user model 
    const booking = this

    // if (user.isModified('password')) {
    //     user.password = await bcrypt.hash(user.password, 8)
    // }
    next()
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
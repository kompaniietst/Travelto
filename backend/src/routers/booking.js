const express = require("express");
const Booking = require('../models/Booking')
const router = express.Router();
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId;

router.post('/bookings', async (req, res) => {
    try {
        const booking = new Booking(req.body)
        await booking.save()
        console.log();

        res.status(200).send({ status: "ok" })
    }
    catch (error) {
        console.log(error);

        res.status(400).send(error.message);
    }
})

router.get('/bookings', async (req, res) => {

    const bookings = await Booking.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "clientId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $project: {
                _id: 1,
                clientId: 1,
                pex: 1,
                hotel: 1,
                date: 1,
                price: 1,
                nights: 1,
                owner_id: 1,
                room_id: 1,
                room_name: 1,
                image: 1,
                status: 1,
                reservation_date: 1,
                user: { $arrayElemAt: ['$user', 0] }
            }
        },
        {
            $project: {
                _id: 1,
                clientId: 1,
                pex: 1,
                hotel: 1,
                date: 1,
                price: 1,
                nights: 1,
                owner_id: 1,
                room_id: 1,
                room_name: 1,
                image: 1,
                status: 1,
                reservation_date: 1,
                "user.email": "$user.email",
                "user.firstname": "$user.firstname",
                "user.phone": "$user.phone",
            }
        },
    ]);

    if (!bookings) return res.status(401).send('Room are empty')

    res.send(bookings)

})

router.get('/bookingsByUser/:id', async (req, res) => {

    const id = req.params.id;
    const bookings2 = await Booking.find({ clientId: ObjectId(id) });

    const bookings = await Booking.aggregate([
        { $match: { clientId: ObjectId(id) } },
        {
            $lookup: {
                from: "users",
                localField: "clientId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $project: {
                _id: 1,
                clientId: 1,
                pex: 1,
                hotel: 1,
                date: 1,
                price: 1,
                nights: 1,
                owner_id: 1,
                room_id: 1,
                room_name: 1,
                image: 1,
                status: 1,
                reservation_date: 1,
                user: { $arrayElemAt: ['$user', 0] }
            }
        },
        {
            $project: {
                _id: 1,
                clientId: 1,
                pex: 1,
                hotel: 1,
                date: 1,
                price: 1,
                nights: 1,
                owner_id: 1,
                room_id: 1,
                room_name: 1,
                image: 1,
                status: 1,
                reservation_date: 1,
                "user.email": "$user.email",
                "user.firstname": "$user.firstname",
                "user.phone": "$user.phone",
            }
        },
    ]);

    if (!bookings) return res.status(401).send('Room are empty')

    res.send(bookings)

})

router.patch('/bookings/:id', async (req, res) => {

    const id = req.params.id;
    const prop = req.body

    if (!id) return res.status(400)

    Booking.findByIdAndUpdate({ _id: id }, { $set: prop }, { new: true },
        function (err, result) {
            console.log(result);

            if (err) throw err;
            res.status(200).send({ status: "ok" })
        });
})

// router.get('/bookings', async (req, res) => {

//     const bookings = await Booking.find();

//     if (!bookings) return res.status(401).send({ error: 'Bookings are empty' })

//     res.send(bookings)
// })



module.exports = router

const express = require("express");
const Booking = require('../models/Booking')
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');

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
                reserved: 1,
                completed: 1,
                canceled: 1,
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
                reserved: 1,
                completed: 1,
                canceled: 1,
                "user.email": "$user.email",
                "user.firstname": "$user.firstname",
                "user.phone": "$user.phone",
                "user.image": "$user.image",
            }
        },
    ]);

    if (!bookings) return res.status(401).send('Room are empty')

    res.send(bookings)

})

router.post('/bookingsByParams', async (req, res) => {

    const owner_id = req.body.owner_id;
    const clientId = req.body.clientId;

    const bookings = await Booking.aggregate([
        {
            $match: {
                $or: [
                    { clientId: ObjectId(clientId) },
                    { owner_id: ObjectId(owner_id) },
                ]
            }
        },
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
                reserved: 1,
                completed: 1,
                canceled: 1,
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
                reserved: 1,
                completed: 1,
                canceled: 1,
                "user.email": "$user.email",
                "user.firstname": "$user.firstname",
                "user.phone": "$user.phone",
                "user.image": "$user.image",
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
        // { $group: { _id: null, myCount: { $sum: 1 } } },
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
                reserved: 1,
                completed: 1,
                canceled: 1,
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
                reserved: 1,
                completed: 1,
                canceled: 1,
                "user.email": "$user.email",
                "user.firstname": "$user.firstname",
                "user.phone": "$user.phone",
                "user.image": "$user.image",
                // count: { $sum: 1 }
            }
        },
        // { $count: "count" } 
        // {
        //     $group: {
        //         _id: null,
        //         myCount: { $sum: 1 }
        //     }
        // },

    ]);



    if (!bookings) return res.status(401).send('Room are empty')

    res.send(bookings)

})

router.patch('/bookings/:id', async (req, res) => {

    const id = req.params.id;
    const prop = req.body

    if (!id) return res.status(400)

    // Booking.findByIdAndUpdate({ _id: id }, { $set: prop }, { new: true },
    // function (err, result) {


    //     if (err) throw err;
    //     res.status(200).send({ status: "ok" })
    // }
    // );
    //   await Booking.findOne({ _id: id }).insert({"Time" : "2012-01-10" });;

    let status = prop.status;

    if (prop.status == 'completed') {
        const booking = await Booking.findOneAndUpdate(
            { _id: id },  //filter
            // { $set: prop },
            { $set: { status: "completed", "completed": new Date() } },
            // {"Time______" : Date.now }, //data to update
            { //options
                returnNewDocument: true,
                new: true,
                strict: false
            },
            function (err, result) {
                let res = result
                console.log();


                if (err) throw err;
                // res.status(200).send({ status: "ok" })
            }

        )
        return res.send(booking);

    }

    if (prop.status == 'canceled') {
        await Booking.findOneAndUpdate(
            { _id: id },  //filter
            { $set: { "canceled": new Date() } },
            // {"Time______" : Date.now }, //data to update
            { //options
                returnNewDocument: true,
                new: true,
                strict: false
            }
        )
    }
})

router.post('/bookings_new', async (req, res) => {

    const date = req.body.date;

    const dateNow = moment(date)
    const bookDate = moment('2020-07-07T18:29:45.782+00:00')

    var d = dateNow.diff(bookDate, 'days')

    console.log(d);

    var tr = '2020-07-08T13:22:36.668+00:00'

    let bookings = await Booking.find({ reserved: { $gte: date } });
    let bookingsIdArr = bookings.map(b => b._id);

    if (!bookings) return res.status(401).send({ error: 'Bookings are empty' })

    res.send(bookingsIdArr)
})



module.exports = router

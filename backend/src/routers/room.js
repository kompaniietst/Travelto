const express = require("express");
const Room = require('../models/Room')
const Hotel = require('../models/Hotel')
const mongoose = require('mongoose')
const router = express.Router();

const ObjectId = mongoose.Types.ObjectId;

router.post('/rooms', async (req, res) => {

    console.log(req.body);

    // var hotel = await Hotel.findOne({ _id: req.body.hotel_id._id })

    try {
        const room = new Room(req.body)
        await room.save();

        res.status(201).send(room)
    }
    catch (error) {
        console.log(error);

        res.status(400).send(error.message)
    }
})

router.post('/roomsByOwner', async (req, res) => {
    // console.log('req', req);
    // console.log('body', req.body);
    // var c = req.param('creator')
    // console.log('params', c);

    const creator = req.body.creator;

    const rooms = await Room.aggregate([
        { $match: { creator: ObjectId(creator) } },
        {
            $lookup: {
                from: "hotels",
                localField: "hotel_id",
                foreignField: "_id",
                as: "hotel"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                price: 1,
                specials: 1,
                images: 1,
                textFeatures: 1,
                hotel: { "$arrayElemAt": ["$hotel", 0] },
                creator: 1
            }
        },
    ]);

    if (!rooms) return res.status(400).send('No rooms')

    res.send(rooms);

    // try {
    //     const hotel = new Hotel(req.body)
    //     await hotel.save()

    //     res.status(201).send({ hotel })
    // }
    // catch (error) {
    //     console.log(error);

    //     res.status(400).send(error.message)
    // }
})
 
router.patch('/rooms/:id', async (req, res) => {

    console.log(req.body, req.params);

    const id = req.params.id;

    Room.findByIdAndUpdate({ _id: id }, req.body, { new: true },
        function (err, result) {
            console.log(result);

            if (err) throw err;
            res.json(result);
        });

    // try {
    //     const hotel = new Hotel(req.body)
    //     await hotel.save()

    //     res.status(201).send({ hotel })
    // }
    // catch (error) {
    //     console.log(error);

    //     res.status(400).send(error.message)
    // }
})

/* router.get('/rooms', async (req, res) => {

    const rooms = await Room.find();

    if (!rooms) return res.status(401).send('Room are empty')

    res.send(rooms)

}) */

router.get('/rooms', async (req, res) => {

    const rooms = await Room.aggregate([
        {
            $lookup: {
                from: "hotels",
                localField: "hotel_id",
                foreignField: "_id",
                as: "hotel"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                price: 1,
                specials: 1,
                images: 1,
                textFeatures: 1,
                hotel: { "$arrayElemAt": ["$hotel", 0] },
                creator: 1
            }
        },
    ]);

    if (!rooms) return res.status(401).send('Room are empty')

    res.send(rooms)

})

router.get('/rooms/:id', async (req, res) => {

    const id = req.params.id;
    // const room = await Room.findOne({ _id: id });


    console.log(ObjectId(id));

    const rooms = await Room.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
            $lookup: {
                from: "hotels",
                localField: "hotel_id",
                foreignField: "_id",
                as: "hotel"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                price: 1,
                specials: 1,
                images: 1,
                textFeatures: 1,
                hotel: { "$arrayElemAt": ["$hotel", 0] }
            }
        },
    ]);

    if (!rooms) return res.status(400).send('Room is not exist')

    res.send(rooms[0])

})

// router.get('/rooms/:id', async (req, res) => {

//     const id = req.params.id;
//     const room = await Room.findOne({ _id: id });

//     if (!room) return res.status(400).send('Room is not exist')

//     res.send(room)

// })

router.get('/roomsByHotel/:id', async (req, res) => {

    const id = req.params.id;
    // const rooms = await Room.find({ hotel_id: id });

    const rooms = await Room.aggregate([
        { $match: { hotel_id: ObjectId(id) } },
        {
            $lookup: {
                from: "hotels",
                localField: "hotel_id",
                foreignField: "_id",
                as: "hotel"
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                price: 1,
                specials: 1,
                images: 1,
                textFeatures: 1,
                hotel: { "$arrayElemAt": ["$hotel", 0] }
            }
        },
    ]);

    if (!rooms) return res.status(401).send('Room are empty')

    res.send(rooms)

})

router.delete('/rooms/:id', async (req, res) => {

    console.log(req.body, req.params);

    const id = req.params.id;

    await Room.deleteOne({ _id: id },
        function (err, result) {
            if (result)
                res.send(result)
        });
})

module.exports = router
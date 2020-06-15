const express = require("express");
const Hotel = require('../models/Hotel')
const City = require('../models/City')
const Room = require('../models/Room')
const router = express.Router();
const mongoose = require('mongoose')

router.post('/hotels', async (req, res) => {
    try {
        const hotel = new Hotel(req.body)
        await hotel.save()

        res.status(201).send({ hotel })
    }
    catch (error) {
        console.log(error);

        res.status(400).send(error.message)
    }
})

router.put('/hotels/:id', async (req, res) => {

    console.log(req.body, req.params);

    const id = req.params.id;

    Hotel.findByIdAndUpdate({ _id: id }, req.body, { new: true },
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

router.get('/hotels', async (req, res) => {

    const hotels = await Hotel.aggregate([
        {
            $lookup: {
                from: "cities",
                localField: "address.city",
                foreignField: "_id",
                as: "city"
            }
        },
        {
            $project: {
                name: 1,
                stars: 1,
                description: 1,
                images: 1,
                amenities: 1,
                address: {
                    city: { "$arrayElemAt": ["$city", 0] },
                    street: 1,
                    houseNumber: 1,
                    disctrict: 1,
                    map: 1,
                }
            }
        },
    ])

    res.send(hotels)
})

router.get('/hotels/:id', async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId;
    var id = req.params.id;
    // var id = req.params.id.map(function (el) { return mongoose.Types.ObjectId(el) })
    var id = mongoose.Types.ObjectId(req.params.id)

    console.log(req.params);
    console.log(req.body);

    const hotel = await Hotel.findOne({ _id: id })


    const hotels = await Hotel.aggregate([
        {
            $match: { _id: ObjectId('5ee411f702536f545c34ea24') }
        },
        // {
        //     $lookup: {
        //         from: "cities",
        //         localField: "address.city",
        //         foreignField: "_id",
        //         as: "city"
        //     }
        // },
        {
            $lookup: {
                "from": "amenities",
                "let": { "amenities2": "$amenities2" },
                "pipeline": [
                    { "$match": { "$expr": { "$in": ["$_id", "$$amenities"] } } }
                ],
                "as": "output"
            }
        },
        {
            $project: {
                name: 1,
                stars: 1,
                description: 1,
                images: 1,
                amenities: 1,
                output: { "$arrayElemAt": ["$output", 0] },
                output2: { "$arrayElemAt": ["$amenities2", 0] },
                address: {
                    // city: { "$arrayElemAt": ["$city", 0] },
                    street: 1,
                    houseNumber: 1,
                    disctrict: 1,
                    map: 1,
                }
            }
        },
    ])

    // var h = hotels.find(x => x._id == id)

    // if (!h) return res.status(401).send({ error: 'Hotel not found' })
    // if (!hotel) return res.status(401).send({ error: 'Hotel not found' })

    res.send(hotels[0])
    // res.send(hotel)
})

module.exports = router

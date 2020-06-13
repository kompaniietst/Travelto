const express = require("express");
const Hotel = require('../models/Hotel')
const City = require('../models/City')
const Room = require('../models/Room')
const router = express.Router();

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

    var id = req.params.id
    console.log(req.params);
    console.log(req.body);

    const hotel = await Hotel.findOne({ _id: id })

    if (!hotel) return res.status(401).send({ error: 'Hotel not found' })

    res.send(hotel)
})

module.exports = router

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

    const hotels = await Hotel.find();

    res.send(hotels)
})

router.get('/hotels/:id', async (req, res) => {

    var id = req.params.id;

    // const hotel = await Hotel.findOne({ _id: id })

    // if (!hotel) return res.send({ error: "Hotel is not exist" })

    // res.send(hotel)

    try {
        const hotel = await Hotel.findOne({ _id: id })
        // await hotel.save()

        res.status(200).send(hotel)
    }
    catch (error) {
        console.log(error);

        res.status(400).send("Hotel is not exist")
    }

})


router.get('/hotelInfoByRoom/:id', async (req, res) => {
    console.log(req.params);
    console.log(req.body);

    const id = req.params.id;
    const hotel = await Hotel.findOne({ _id: id });

    if (!hotel) return res.status(400).send('Hotel is not exist')

    res.send(hotel)

})

module.exports = router

const express = require("express");
const Hotel = require('../models/Hotel')
const City = require('../models/City')
const Room = require('../models/Room')
const router = express.Router();
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId;

router.post('/hotels', async (req, res) => {
    try {
        const hotel = new Hotel(req.body)
        await hotel.save();

        res.status(201).send(hotel)
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

// get hotels by params
router.post('/hotelsBy', async (req, res) => {

    const creator = req.body.creator;

    const hotels = await Hotel.find({ creator: ObjectId(creator) });

    if (!hotels) return res.status(400).send('No hotels')

    res.send(hotels);

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

        res.status(400).send("Hotel is not exist")
    }

})


router.get('/hotelInfoByRoom/:id', async (req, res) => {

    const id = req.params.id;
    const hotel = await Hotel.findOne({ _id: id });

    if (!hotel) return res.status(400).send('Hotel is not exist')

    res.send(hotel)

})


router.delete('/hotels/:id', async (req, res) => {

    console.log(req.body, req.params);

    const id = req.params.id;

    await Hotel.deleteOne({ _id: id },
        function (err, result) {
            if (result)
                res.send(result)
        });
})

module.exports = router

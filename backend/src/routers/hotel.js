const express = require("express");
const Hotel = require('../models/Hotel')
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

router.get('/hotels', async (req, res) => {

    const hotels = await Hotel.find();

    if (!hotels) return res.status(401).send({ error: 'Hotels are empty' })

    res.send(hotels)
})

router.get('/hotels/:id', async (req, res) => {

    var id = req.params.id
    console.log(req.params);
    console.log(req.body);

    const hotel = await Hotel.findOne({  _id: id })
    // const hotel = await Hotel.findOne({  _id: "5edabde015563b1ed0058862" })
    // const hotels = await Hotel.find();

    if (!hotel) return res.status(401).send({ error: 'Hotel not found' })

    res.send(hotel)
})

module.exports = router

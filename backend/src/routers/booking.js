const express = require("express");
const Booking = require('../models/Booking')
const router = express.Router();

router.post('/bookings', async (req, res) => {
    try {
        const booking = new Booking(req.body)
        await booking.save()
        console.log();

        res.status(200).send({ status: "ok" })
    }
    catch (error) {
        console.log(error);

        res.status(400).send(error.message)
    }
})

router.get('/bookings', async (req, res) => {

    const bookings = await Booking.find();

    if (!bookings) return res.status(401).send({ error: 'Bookings are empty' })

    res.send(bookings)
})



module.exports = router

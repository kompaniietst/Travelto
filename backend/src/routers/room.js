const express = require("express");
const Room = require('../models/Room')
const router = express.Router();

router.post('/rooms', async (req, res) => {
    try {
        const room = new Room(req.body)
        await room.save()

        res.status(201).send({ room })
    }
    catch (error) {
        console.log(error);

        res.status(400).send(error.message)
    }
})

router.put('/rooms/:id', async (req, res) => {

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

router.get('/rooms', async (req, res) => {

    const rooms = await Room.find();

    if (!rooms) return res.status(401).send('Room are empty')

    res.send(rooms)

})

router.get('/rooms/:id', async (req, res) => {

    const id = req.params.id;
    const room = await Room.findOne({ _id: id });

    if (!room) return res.status(400).send('Room is not exist')

    res.send(room)

})

router.get('/roomsByHotel/:id', async (req, res) => {

    const id = req.params.id;
    const rooms = await Room.find({ hotel_id: id });

    if (!rooms) return res.status(401).send('Room are empty')

    res.send(rooms)

})

module.exports = router
const express = require("express");
const Room = require('../models/Room')
const router = express.Router();

router.post('/rooms', async (req, res) => {
    try {
        console.log(req.body);


        const room = new Room(req.body)
        await room.save()

        res.status(201).send({ room })
    }
    catch (error) {
        console.log(error);

        res.status(400).send(error.message)
    }
})

router.get('/rooms', async (req, res) => {



    const rooms = await Room.find();

    if (!rooms) return res.status(401).send({ error: 'Room are empty' })

    res.send(rooms)

})

module.exports = router
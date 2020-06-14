const express = require("express");
const Amenity = require('../models/Amenity')
const router = express.Router();

router.post('/amenities', async (req, res) => {  
    try {
        const amenity = new Amenity(req.body)
        await amenity.save()

        res.status(201).send({ amenity })
    }
    catch (error) {
        console.log(error);

        res.status(400).send(error.message)
    }
})

router.put('/amenities/:id', async (req, res) => {

    console.log(req.body, req.params);

    const id = req.params.id;

    Amenity.findByIdAndUpdate({ _id: id }, req.body, { new: true },
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

router.get('/amenities', async (req, res) => {

    const amenities = await Amenity.find();

    if (!amenities) return res.status(401).send({ error: 'Amenities are empty' })

    res.send(amenities)
})

module.exports = router

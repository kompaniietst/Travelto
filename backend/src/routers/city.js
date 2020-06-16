const express = require("express");
const City = require('../models/City')
const router = express.Router();

router.post('/cities', async (req, res) => {
    try {
        const city = new City(req.body)
        await city.save()

        res.status(201).send({ city })
    }
    catch (error) {
        console.log(error);

        res.status(400).send(error.message)
    }
})

router.get('/cities', async (req, res) => {

    const cities = await City.find();

    if (!cities) return res.status(401).send({ error: 'Cities are empty' })

    res.send(cities)
})



module.exports = router

const express = require("express");
const User = require('../models/User')
const router = express.Router();

router.post('/users', async (req, res) => {
    // Create a new user 

    const userExist = await User.findOne({ email: req.body.email })

    if (userExist) {
        res.status(400).send('Email is already registered')
        return
    }

    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({ user, token })
    }
    catch (error) {
        console.log(error);

        res.status(400).send(error.message)
    }
})

router.put('/users/:id?', async (req, res) => {
    // Update the user 
    const id = req.params.id

    User.findByIdAndUpdate({ _id: id }, req.body, { new: true },
        function (err, result) {
            if (err) throw err;
            res.json(result);
        });

    if (!user) { throw new Error('Invalid login credentials') }
})

router.post('/users/login', async (req, res) => {
    //Login a registered user 
    const { email, password } = req.body

    try {
        const user = await User.findByCredentials(email, password)

        if (!user) {
            return res.status(401).send('Login failed! Check authentication credentials')
        }

        const token = await user.generateAuthToken()

        res.send({ user, token })
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router

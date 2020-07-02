const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://kompanietst:kompanietst@cluster0-nupkw.mongodb.net/travelTo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

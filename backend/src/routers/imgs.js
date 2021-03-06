const express = require("express");
// const User = require('../models/User')
const router = express.Router();

console.log('__dirname',__dirname);

router.use('/images', express.static(__dirname + '/src/uploads'));


var multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post('/images', upload.array('files'), function (req, res, next) {
    console.log('/imgs',req.files)
    res.send(req.files);
});


module.exports = router
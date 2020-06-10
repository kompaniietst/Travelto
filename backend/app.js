const express = require('express')
const userRouter = require('./src/routers/user')
const User = require('./src/models/User')
const dotenv = require('dotenv').config();
require('./src/db/db')
const port = process.env.PORT;
const cors = require('cors');

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)

app.use(cors());

// Upload images

app.use('/images', express.static(__dirname + '/uploads'));
app.use('/images/profImages', express.static(__dirname + '/uploads/profImages'));

var multer = require('multer')

var uploadImages = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    })
})
app.post('/images', uploadImages.array('files'), function (req, res, next) {
    res.send(req.files);
});


var uploadImage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/profImages/')
        },
        filename: function (req, file, cb) {
            cb(null, (file.originalname).replace(/ /g,''))
        }
    })
})
app.post('/images/profImages/:id?', uploadImage.single('file'), async function (req, res, next) {

    const file = req.file;
    const id = req.params.id;
    const imageUrl = `/images/profImages/` + file.filename;
    // const imageUrl = `http://localhost:${port}/images/profImages/` + file.filename

    await User.findByIdAndUpdate({ _id: id },

        { "image": imageUrl },

        { new: true }, function (err, result) {
            if (err) throw err;
            console.log(result);

            res.json({ filename: imageUrl });
        });
    //res.send();
});

app.listen(port, () => console.log(`Server running on port ${port}`))
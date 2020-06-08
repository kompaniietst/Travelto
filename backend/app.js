const express = require('express')
const userRouter = require('./src/routers/user')
// const imgsRouter = require('./src/routers/imgs')
const dotenv = require('dotenv').config();
require('./src/db/db')
const port = process.env.PORT;
const cors = require('cors');

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
// app.use(imgsRouter)




app.use(cors());



app.use('/images', express.static(__dirname + '/uploads'));

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

app.post('/images', upload.array('files'), function (req, res, next) {
    console.log('/imgs',req.files)
    res.send(req.files);
});

app.listen(port, () => console.log(`Server running on port ${port}`))
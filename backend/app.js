var express = require("express");
const dotenv = require('dotenv').config();
// const dotenv =  require('dotenv').config({ path: './.env' });
const bodyParser = require('body-parser');
require('./src/db/db')
const port = process.env.PORT;
const cors = require('cors');

const userRouter = require('./src/routers/user')
const User = require('./src/models/User')

const hotelRouter = require('./src/routers/hotel')
const Hotel = require('./src/models/Hotel')

const roomRouter = require('./src/routers/room')

const amenityRouter = require('./src/routers/amenity')
const Amenity = require('./src/models/Amenity')

const cityRouter = require('./src/routers/city')
const City = require('./src/models/City')

const bookingRouter = require('./src/routers/booking')
const Booking = require('./src/models/Booking')

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(request, response) {
  console.log('[support dash] processing get request')
  response.send('Hello World 2!');
});

app.listen(process.env.PORT, function () {
  console.log('***** exp listening on port: ' + process.env.PORT);
});



// const express = require('express')
// const bodyParser = require('body-parser');
// require('./src/db/db')
// const port = process.env.PORT;
// const cors = require('cors');

// const userRouter = require('./src/routers/user')
// const User = require('./src/models/User')

// const hotelRouter = require('./src/routers/hotel')
// const Hotel = require('./src/models/Hotel')

// const roomRouter = require('./src/routers/room')

// const amenityRouter = require('./src/routers/amenity')
// const Amenity = require('./src/models/Amenity')

// const cityRouter = require('./src/routers/city')
// const City = require('./src/models/City')

// const bookingRouter = require('./src/routers/booking')
// const Booking = require('./src/models/Booking')

// const app = express()

// app.use(cors())
// app.use(express.json())
// app.use(userRouter)
// app.use(hotelRouter)
// app.use(roomRouter)
// app.use(amenityRouter)
// app.use(cityRouter)
// app.use(bookingRouter)

// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())


// var multer = require('multer')


// function uploadImages(folderName) {
//     return multer({
//         storage: multer.diskStorage({
//             destination: function (req, file, cb) {
//                 cb(null, `./uploads/${folderName}/`)
//             },
//             filename: function (req, file, cb) {
//                 cb(null, (file.originalname).replace(/ /g, ''))
//             }
//         })
//     })
// }

// app.use('/images/hotels', express.static(__dirname + '/uploads/hotels'));
// app.post('/images/hotels', uploadImages('hotels').array('files'), function (req, res, next) {
//     const files = req.files.map(f => f.filename);
//     res.send(files);
// });

// app.use('/images/rooms', express.static(__dirname + '/uploads/rooms'));
// app.post('/images/rooms', uploadImages('rooms').array('files'), function (req, res, next) {
//     console.log(req.files);

//     const files = req.files.map(f => f.filename);
//     res.send(files);
// });

// app.use('/images/amenities', express.static(__dirname + '/uploads/amenities'));
// app.post('/images/amenities', uploadImages('amenities').array('files'), function (req, res, next) {
//     res.send(req.files);
// });

// app.get('/healthcheck',async (req, res) => {
//     res.send("Nope");
// })
// app.use('/images/profImages', express.static(__dirname + '/uploads/profImages'));
// app.post('/images/profImages/:id?', uploadImages('profImages').single('file'), async function (req, res, next) {

//     const file = req.file;
//     const id = req.params.id;
//     const imageUrl = `/images/profImages/` + file.filename;

//     await User.findByIdAndUpdate({ _id: id },

//         { "image": imageUrl },

//         { new: true }, function (err, result) {
//             if (err) throw err;
//             console.log(result);

//             res.json({ filename: imageUrl });
//         });
// });


// app.listen(port, () => console.log(`Server running on port ${port}`))
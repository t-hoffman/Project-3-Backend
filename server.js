///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// initialize .env variables
require("dotenv").config();

// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT } = process.env;
const cors= require('cors');
const morgan = require('morgan');

// import express
const express = require("express");
require('./config/db.connection')

const { homeControllers } = require ('./controllers')
const { reviewControllers } = require ('./controllers')

// create application object
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/home', homeControllers );
app.use('/review', reviewControllers)
app.use((err, req, res, next) => res.status(500).send(err))

// app.use('/test', async (req,res) => {
//     const data = require('./data/LAdata.json');
//     const seedingData = [];
//     data.forEach(d => {
//         const rate = d.pricing.rate ? d.pricing.rate.amount : '';
//         let photos = []

//         if (d.photos.length > 0) {
//             d.photos.map(p => {
//                 photos.push(p.pictureUrl)
//             })
//         }
// const lat = d.location ? d.location.lat : '';
// const lng = d.location ? d.location.lng : '';
//         seedingData.push({
//             name: d.name,
//             address: d.address,
//             location: {
//                 lat: lat,
//                 long: lng
//             },
//             numberOfGuests: d.numberOfGuests,
//             rate: rate,
//             roomType: d.roomType,
//             stars: d.stars,
//             url: d.url,
//             photos: photos,
//             host: {
//                 name: d.primaryHost.smartName,
//                 about: d.primaryHost.about,
//                 photo: d.primaryHost.pictureUrl,
//                 isSuperHost: d.primaryHost.isSuperHost
//             }
//         })
//     });
//     let i = 0;
//     const respData = [];
//     while (i < 10) {
//         respData.push(seedingData[i]);
//         i++;
//     }
//     res.send(respData)
// })
	
///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("hello world");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
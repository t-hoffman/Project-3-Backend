const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name Required']},
    address: {type: String, require: [true, 'Address Required']},
    location: {
        lat: {type: Number},
        long: {type: Number}
    },
    numberOfGuests: Number,
    rate: String,
    roomType: String,
    stars: Number,
    url: String,
    photos: [
        {type: String}
    ],
    host: {
        name: String,
        about: String,
        photo: String,
        isSuperHost: Boolean
    },
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Review',
        }
    ]
});

const Home = mongoose.model('Home', homeSchema);
module.exports = Home;
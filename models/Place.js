const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    google_id: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    lat_lng: {
        type: {
            lat: Number,
            lng: Number
        },
        required: true
    },
    date_created: {
        type: Date,
        required: true,
        default: new Date()
    }
})

// create model using the schema as structure
const Place = mongoose.model('Place', PlaceSchema);

// export model
module.exports = Place;
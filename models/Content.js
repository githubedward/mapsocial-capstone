const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a new Schema that describes key-value pairs
const ContentSchema = new Schema({
    place_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    place_name: {
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
    timestamp: {
        type: Number,
        required: true,
        default: new Date()
    },
    date_visited: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        id: String,
        data: Buffer,
        default: ''
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    comments: {
        type: [],
        required: true,
    }
})

// create model using the schema as structure
// const Content = mongoose.model('Content', ContentSchema);

// export model
module.exports = ContentSchema;
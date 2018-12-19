const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContentSchema = require('./Content')
// const Followings = require('./Followings')

const UserSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        default: 'test user'
    },
    password: {
        type: String,
        required: true,
        default: 'test password'
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: undefined
    },
    date_created: {
        type: Date,
        required: true,
        default: new Date()
    },
    current_center: {
        type: {
            lat: Number,
            lng: Number
        },
        default: {
            lat: 43.65227,
            lng: -79.383514
        },
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "What's up?"
    },
    followings: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    places: [{
        type: Schema.Types.ObjectId,
        ref: 'Place'
    }],
    contents: {
        type: [ContentSchema],
    }
})

// create model using the schema as structure
const User = mongoose.model('User', UserSchema);

// export model
module.exports = User;
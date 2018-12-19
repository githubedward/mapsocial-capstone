const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors'),
    uuidv4 = require('uuid/v4'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv');

// db models
const User = require('./models/User'),
    Place = require('./models/Place');

// process env
dotenv.config();
mongoose.connect(`mongodb://${process.env.DB_UN}:${process.env.DB_PW}@ds0${process.env.DB_PORT}.mlab.com:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true });

// mongoooooose
const connection = mongoose.connection;
connection.on('open', () => {
    console.log('mongoose connected! ---------------------');
})

const app = express();
const port1 = 8080;

const api_key = 'edward'

// middlewares
app.use(cors());
app.use(morgan('common'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// error msgs
const errorMsg = {
    apiKey: { Error: 'An authentication key is required. Please provide a valid API key query parameter' },
    userId: { Error: 'User ID not found. Please provide a valid User ID' },
    post: { Error: 'Please provide a valid req.body'}
}

// callback routes
const callback = {
    getUserData: (req, res) => {
        const { userId } = req.params;
        const req_key = req.query.api_key
        // check if api_key is valid
        if (!req_key || api_key !== req_key) {
            return res.status(401).json(errorMsg.apiKey);
        } else {
            // send query to db and return user data if found
            User.findById({_id:userId})
                .populate('followings')
                .populate('places')
                .then(result => res.json(result))
                .catch(err => res.status(501).json(err));
        }
    },
    getAllLocations: (req, res) => {
        const { userId } = req.params;
        const req_key = req.query.api_key;
        if (!req_key || api_key !== req_key) {
            return res.status(401).json(errorMsg.apiKey);
        } else {
            // send query to db and return places if found
            Place.find({user_id: userId})
                .populate('user_id')
                .then(result => {
                    // console.log(result)
                    return res.json(result)
                })
                .catch(err => res.status(501).json(err))
        }
    },
    postLocation: (req, res) => {
        const { userId } = req.params;
        const req_key = req.query.api_key;
        let bodyKeyReq = ['name', 'google_id', 'address', 'lat_lng'];
        let bodyKeys = Object.keys(req.body);
        let isValidBody = bodyKeyReq.every(req => bodyKeys.includes(req));
        
        if (!req_key || api_key !== req_key) {
            return res.status(401).json(errorMsg.apiKey);
        } else if (!isValidBody) {
            return res.status(401).json(errorMsg.post)
        } else {
            // send create query to db and return user data if successfully created
            const newPlace = new Place({
                user_id: userId,
                ...req.body
            })
            console.log(newPlace)
            newPlace.save()
                .then(result => {
                    console.log(result);
                    Place.findById({_id: newPlace._id})
                        .populate('user_id')
                        .then(result => {
                            return res.json(result)
                        })
                })
                .catch(err => res.status(501).json(err))
            User.findOneAndUpdate({_id:userId}, {current_center: req.body.lat_lng})
                .then(result => console.log('Current_center update: ', result))
                .catch(err => console.log(err))
        }
    },
    postNewContent: (req, res) => {
        const { userId } = req.params;
        const req_key = req.query.api_key;
        let bodyKeyReq = ['text', 'image', 'place_id', 'place_name', 'lat_lng', 'date_visited'];
        let bodyKeys = Object.keys(req.body);
        let isValidBody = bodyKeyReq.every(req => bodyKeys.includes(req));
        
        if (!req_key || api_key !== req_key) {
            return res.status(401).json(errorMsg.apiKey);
        } else if (!isValidBody) {
            return res.status(401).json(errorMsg.post)
        } else {
            console.log(req.body)
            let newBody = {
                ...req.body,
                timestamp: new Date().getTime()
            }
            User.findOneAndUpdate({_id: userId}, {
                $push: {contents: newBody}
            }).then(result => res.json(result))
            .catch(err => res.status(501).json(err))
        }
    }
}

// routes
app.route('/:userId')
    .get(callback.getUserData)
app.route('/:userId/places')
    .get(callback.getAllLocations)
    .post(callback.postLocation)
app.route('/:userId/contents')
    .post(callback.postNewContent)

// listener
app.listen(port1, () => {
    console.log(`Hey human, CORS-enabled server is now running at port ${port1} 😏`)
})
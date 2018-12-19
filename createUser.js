const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const Test = require('./models/TestModel');
const User = require('./models/User');

dotenv.config();

mongoose.connect(`mongodb://${process.env.DB_UN}:${process.env.DB_PW}@ds0${process.env.DB_PORT}.mlab.com:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true })

const connection = mongoose.connection;
connection.on('open', () => {
    console.log('mongoose connected! ---------------------');
})

// const test = new Test({
//     name: 'test2'
// })

// test.save()
//     .then(savedTest => console.log(savedTest))
//     .catch(err => console.err(err))

const user = new User({
    user_name: 'kajensmap',
    password: '123456',
    first_name: 'Kajen',
    last_name: 'Kirubahkaran',
    avatar: 'https://media.licdn.com/dms/image/C4D03AQHNVCC1RWkbmQ/profile-displayphoto-shrink_800_800/0?e=1550102400&v=beta&t=mo95kLwRNRrufj6K3_34XcXpg7vWCfhtedxTncnq_0M',
    status: 'Hungry and excited'
})

user.save()
    .then(savedTest => console.log(savedTest))
    .catch(err => console.err(err))
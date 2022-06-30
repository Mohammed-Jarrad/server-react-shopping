const mongoose = require('mongoose')

const connectionString = 'mongodb://localhost/react-shopping-cart'

const connectDB = () => {
    mongoose.connect( process.env.MONGO_URI || connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('Connection Done'))
        .catch(err => console.log(err))
}

module.exports = connectDB;
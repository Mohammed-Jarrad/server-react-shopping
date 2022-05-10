const express = require('express');
const productsRouter = require('./routes/productsRoutes');
const orderRouter = require('./routes/orderRoutes');
const userRouter = require('./routes/userRouter');
const cartItemRouter = require('./routes/cartItemRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors');

//!config
const app = express();
app.use(cors());
// for images uploaded
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// !Connection Database
connectDB();

//!Routes
app.use('/', productsRouter);
app.use('/', orderRouter);
app.use('/', userRouter);
app.use('/', cartItemRouter);
app.use('/', reviewRouter);

// !Listen
const PORT = process.env.PORT;
app.listen(PORT || 5002, () => console.log(`Server Running on port ${PORT}`));

// if(process.env.NODE_ENV === 'production') {
//     app.use('/', express.static('public'))
//     app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))
// } else {
//     app.get('/', (req, res) => res.send('API Running'))
// }

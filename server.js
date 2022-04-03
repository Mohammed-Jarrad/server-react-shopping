const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const productsRouter = require("./routes/productsRoutes");
const orderRouter = require("./routes/orderRoutes");
const connectDB = require("./config/db");
require("dotenv").config();
const userRouter = require('./routes/userRouter');

const app = express();
app.use(express.json())
app.use(bodyParser.json());

// Connect DB
connectDB();

app.use("/", productsRouter);
app.use("/", orderRouter);
app.use("/", userRouter)


const PORT = process.env.PORT;
app.listen(PORT || 5002, () => console.log(`Server Running on port ${PORT}`));

// if(process.env.NODE_ENV === 'production') {
//     app.use('/', express.static('public'))
//     app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))
// } else {
//     app.get('/', (req, res) => res.send('API Running'))
// }
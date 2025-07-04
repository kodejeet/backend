const express = require("express");
const {connectMongoDb} = require('./connection');

const { logReqRes } = require("./middlewares");
const userRouter = require('./routes/user');

const app = express();
const PORT = 1111;

// connection 
connectMongoDb("mongodb://127.0.0.1:27017/xyz-app-1").then(() =>
    console.log('Mongodb Connected!')
);


// Middleware plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// routes
app.use('/api/users', userRouter);
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));






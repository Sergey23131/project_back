require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const {PORT, MONGO_CONNECT_URL} = require('./configs/config');
const userRouter = require('./routers/user-router');
const authRouter = require('./routers/auth-router');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
});

app.listen(5000, () => {
    console.log(`App listen ${PORT}`);
});


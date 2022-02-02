require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const {PORT, MONGO_CONNECT_URL, NODE_ENV, ALLOWED_ORIGIN} = require('./configs/config');
const {userRouter, authRouter} = require('./routers');

const ErrorHandler = require("./errors/ErrorHandlers");
const checkDefaultData = require('./util/defoult-data.util');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: _configureCors}));

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
    checkDefaultData();
});

function _configureCors(origin, callback) {

    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whitelist = ALLOWED_ORIGIN.split(';');

    if (!whitelist.includes(origin)) {
        return callback(new ErrorHandler('Cors is not allowed'), false);
    }
    return callback(null, true);
}
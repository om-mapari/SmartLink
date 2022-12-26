// When deployed on heruku = newtork = access from anywhere

const mongoose = require("mongoose");

const connectDB = (url) => {
    // returns promise
    return mongoose.connect(url, {
        //No More Deprecation Warning Options in Mongoose 6
        //- these are no longer supported options in Mongoose 6 - only use it with old versions
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;

const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = ()=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.DATABASE_URL, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;
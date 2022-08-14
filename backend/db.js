// Here we have to connect mongoUri  to nodejs with mongoose as backend server
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const mongoURI = process.env.REACT_APP_NEWS_API;

const connectToMongo = () => {
    mongoose.connect(mongoURI, { 
    }).then(() => {
        console.log("connected to mongo successfully")
    }).catch((err) => {
        console.log("Not connected to mongo successfully")
        console.log(err);
    })
    } ;
    
module.exports = connectToMongo;



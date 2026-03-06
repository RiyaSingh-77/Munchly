const mongoose = require('mongoose');


//connection of server to Data base.

function connectDB() {
    mongoose.connect("mongodb://localhost:27017/food_view")
    .then( () => {
        console.log("MongoDB connected");
    })
    .catch( (err) => {
        console.log("MongoDB connection error:", err);
    })
}

module.exports = connectDB;

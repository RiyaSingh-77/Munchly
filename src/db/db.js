const mongoose = require('mongoose');


//connection of server to Data base.

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then( () => {
        console.log("MongoDB connected");
    })
    .catch( (err) => {
        console.log("MongoDB connection error:", err);
    })
}

module.exports = connectDB;

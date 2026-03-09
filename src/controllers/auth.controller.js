const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser(req, res){

    const {fullName, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email 
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,

    }, "63f19d12773c6288a4e858c834486c64")
    res.cookie("token", token)

    res.status(201).json({ //at the time of new resource we use 201 as code

        message: "User registered successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
            //We do not send password at frontend


        }
    })
}

async function loginUser(req, res) {
    res.send("Login User API");

};

module.exports = {
    registerUser,
    loginUser
}

//Here we use so many controllers
//We can export one controller from one file
//Thus we'll export an object where we can have multiple controllers


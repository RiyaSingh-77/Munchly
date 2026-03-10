const foodModel = require('../models/food.model');
const storageServices = require('../services/storage.service');
const { v4: uuid } = require("uuid")


async function createFood(req, res) {
    console.log("CONTROLLER HIT!")
    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file) //captures the data of file



    const fileUploadResult = await storageServices.uploadFile(req.file.buffer, uuid())

    console.log(fileUploadResult)

   res.send("food item created")
}
    

module.exports = {
    createFood
}
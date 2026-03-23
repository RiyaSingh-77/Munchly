const foodPartnerModel = require("../models/foodpartner.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");


/*A MIDDLEWARE HAS 3 PARAMETERS, req, res and next */

async function authFoodPartnerMiddleware(req, res, next){
    /*If a food-partner registers, a token is generated which is stored 
    in a cookie, if token is not stored in cookie, then that
    food-partner has neither logged in nor registered  */
    console.log("Middleware hit!")
    console.log("Cookies:", req.cookies)

    const token = req.cookies.fp_token;
    console.log("Token:", token)
    if(!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try{

        /* jwt.verify checks whether the token is correct or not,
        if the token is correct then the data
        with which the token is created will be
        stored in decoded, but if the token is wrong,
        thern jwt.verify method will return the error*/

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner

        next()

    } catch(err) {
        return res.status(401).json({
            message: "Invalid token"
        })

    }
}

async function authUserMiddleware(req, res, next) {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);
        req.user = user
        next()
    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }
}



module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware

}
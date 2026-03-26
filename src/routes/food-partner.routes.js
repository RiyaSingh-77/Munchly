const express = require('express');
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/* /api/food-partner/me */
router.get("/me",
    authMiddleware.authFoodPartnerMiddleware,
    (req, res) => {
        res.status(200).json({ foodPartner: req.foodPartner })
    }
);

/* /api/food-partner/:id — public, no auth needed */
router.get("/:id", 
    foodPartnerController.getFoodPartnerById);

module.exports = router;
const express = require("express");
const UserModel = require("../models/UserModel");

const router = express.Router();

router.post("/createAdmin", async (req, res) => {
    try {
        let checkUser = await FoodItemModel.find({ name: req.body.name });

        if (checkUser.length > 0) {
            return res.json({ success: false, status: 400, message: "Item is already present" });
        }

        

        res.json({ success: true, status: 201, message: "Successfully created" });

    }
    catch (error) {
        res.json({ success: false, status: 400, message: error.message });
    }
})

module.exports = router;
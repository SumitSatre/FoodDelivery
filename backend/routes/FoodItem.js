const express = require("express");
const FoodItemModel = require("../models/FoodItemModel");

const router = express.Router();

router.post("/createFoodItem", async (req, res) => {
    try {
        let nameCheck = await FoodItemModel.find({ name: req.body.name });

        if (nameCheck.length > 0) {
            return res.json({ success: false, status: 400, message: "Item is already present" });
        }

        await FoodItemModel.create({
            name: req.body.name,
            CategoryName: req.body.CategoryName,
            img: req.body.img,
            options: [
                {
                    half: req.body.halfPrice,
                    full: req.body.fullPrice
                }
            ]
        })

        res.json({ success: true, status: 201, message: "Successfully created" });

    }
    catch (error) {
        res.json({ success: false, status: 400, message: error.message });
    }
})

router.get("/getFoodItems", async (req, res) => {

    try {
        let foodItemsData = await FoodItemModel.find({});
        res.json({ success: true, status: 201, foodItemsData });
    }
    catch (error) {
        res.json({ success: false, status: 400, message: error.message });
    }
})

router.post("/deleteFoodItems", async (req, res) => {

    try {
        let foodItemsData = await FoodItemModel.deleteOne({name : req.body.name});
        res.json({ success: true, status: 201, foodItemsData });
    }
    catch (error) {
        res.json({ success: false, status: 400, message: error.message });
    }
})

module.exports = router;
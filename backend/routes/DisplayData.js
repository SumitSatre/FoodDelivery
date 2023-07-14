const express = require('express');
const mongoose = require("mongoose");

const router = express.Router();

// This route is used to give food Category Data and food Items data to the frontend
// Which displayed exact downside of the crousel
// according to food category , food items are arranged
router.post("/foodData" , async (req , res)=>{

    try{
        // Here we already connected mongoose to database 
        let foodItems = mongoose.connection.db.collection("food_items");
        let foodItemsdata = await foodItems.find({}).toArray();

        let foodCategory = mongoose.connection.db.collection("foodCategory");
        let foodCategoryData = await foodCategory.find({}).toArray();
        
        res.send([{success : true} ,foodCategoryData , foodItemsdata ]);
    }
    catch(error){
        console.log(error.message);
        res.send({success : false});
    }
})

module.exports = router ;
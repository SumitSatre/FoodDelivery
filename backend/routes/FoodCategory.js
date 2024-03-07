const express = require("express");

const FoodCategoryModel = require("../models/FoodCategoryModel");

const router = express.Router();

// http://localhost:5000/api/upload/categories

router.post("/upload/categories" , async (req ,res , next) => {
    const categoriesList = req.body.categoriesList;

    for(let i = 0 ; i<categoriesList.length ; i++){
        let categoryItem = categoriesList[i];

        await FoodCategoryModel.create(categoryItem);
    }

    res.send({"success" : true});
});

module.exports = router;
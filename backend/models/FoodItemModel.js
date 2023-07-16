const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
    CategoryName : {
        type : String ,
        required : [true , "Please Select Category!!"]
    },

    name : {
        type : String ,
        required : [true , "Please Enter Name of food item!!"]
    },
    
    img : {
        type : String ,
        required : [true , "Please Enter image of food item!!"]
    },

    options : [
        {
            half : {
                type : String
            },
            full : {
                type : String
            }
        }
    ]
})

module.exports = mongoose.model("food_items" , foodItemSchema );
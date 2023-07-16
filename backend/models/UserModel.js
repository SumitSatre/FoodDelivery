const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    location :{
        type : String,
        required: [true, "Please , Enter the location!!"]
    },
    email :{
        type : String,
        required: true
    },
    password :{
        type : String,
        required: [true, "Please , Enter the password!!"]
    },
    date :{
        type : String,
        default : new Date().toDateString()
    },
    isAdmin : {
        type : Boolean
    }
});

module.exports = mongoose.model("users" , UserSchema);
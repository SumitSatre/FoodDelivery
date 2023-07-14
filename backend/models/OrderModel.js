const mongoose = require("mongoose");

//  defines the structure and property of the document in the MongoDB collection
const OrderSchema = new mongoose.Schema({
    email :{
        type : String,
        required: true
    },
    order_data :{
        type : Array,
        required: [true, "Please , Enter the order data!!"]
    },

})

module.exports = mongoose.model("orders" , OrderSchema);

/* This allows us to use this model in other parts of our application to perform operations such as
 creating, reading, updating, and deleting order documents in the database. */
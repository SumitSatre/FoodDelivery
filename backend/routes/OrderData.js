const express = require('express');
const OrderModel = require("../models/OrderModel");

const router = express.Router();

// This api is called when we click CkeckOut button in the My Cart Page
router.post('/orderData', async (req, res) => {

    let data = req.body.order_data;
    // console.log(data);

    // index 0 to 0 la cut karun Tya position madhe ek object with one attribute add karte [Order_date] 
    await data.splice(0, 0, { Order_date: req.body.order_date });
    // console.log("after spliced : " , data);

    
    let eId = await OrderModel.findOne({ 'email': req.body.email });
    //console.log(eId);
    
    //if email not exisitng in database then create a row for it  
    if (eId == null) {
        try {
            await OrderModel.create({
                email: req.body.email,
                order_data: [data]
            })

            res.send({ success: true , status : 200 });

        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    // If email is present at database find that email then in array order_data push another order
    else {
        try {
            await OrderModel.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } })

            res.send({ success: true });

        }
        catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

// User sends its email according to the email we find its data and send to the user
router.post("/myOrderData" , async (req ,res) => { 
    
    try{
        let myData = await OrderModel.findOne({"email" : req.body.email});
        res.json ({success : true , orderData : myData });
    }

    catch (error) {
        console.log(error.message)
        res.send({success : false , message : error.message} );
    }
} )


module.exports = router;
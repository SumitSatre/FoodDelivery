const express = require("express");

// It should be declared at the start then it works for entire project
// It is used to load environment variables from a specific configuration file
const dotenv = require('dotenv');
dotenv.config({path : "./config/config.env"});


// Connecting to the database
const mongodb = require("./config/db");
mongodb();

const app = express();
app.use(express.json());    // It is used to parse incoming requests with JSON payloads

// It is middleware whch allows the specified server to access the backend server 
app.use((req , res , next)=>{
    res.setHeader("Access-Control-Allow-Origin" , process.env.FrontendWebAddress);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With , Content-Type , Accept"
    )
    next();
})

// Routed Imported 
const userRoute = require("./routes/userRoute.js");
const displayData = require("./routes/DisplayData.js");
const OrderData = require("./routes/OrderData.js");
const FoodItem = require ("./routes/FoodItem");
const UsersData = require ("./routes/UsersData");
const AdminRoute = require ("./routes/Admin.js");

// Routes used
app.use("/api" , userRoute );
app.use("/api" , displayData );
app.use("/api" , OrderData );
app.use("/api" , FoodItem );
app.use("/api" , UsersData );
app.use("/api/admin" , AdminRoute );

// It  is used to start a server that listens on port mentioned in confuguration file

app.listen(process.env.PORT , ()=>{
    console.log(`Working at http://localhost:${process.env.PORT}/`)
});


// The dotenv package is commonly used to load environment variables from a configuration file 
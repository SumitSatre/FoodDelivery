const mongoose = require ('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/E-Commerce"

const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI)
    .then(()=>{
        console.log("connected");
    })
}


module.exports = connectToMongo;

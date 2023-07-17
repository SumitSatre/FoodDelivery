const mongoose = require("mongoose");;

const mongodb_connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected!');
        
    } catch (error) { 
        console.log('error: ', error);
    }
};
module.exports = mongodb_connect;

// mongodb+srv://sumitsatre03:tbGBJVpnxa4fZMVo@cluster0.rmqr2zc.mongodb.net/hHungryhHubMern?retryWrites=true&w=majority
//mongodb://127.0.0.1:27017/HungryHub
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

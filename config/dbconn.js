const mongoose = require('mongoose');

const dbConnection = () => {
    try{
        mongoose.connect(process.env.MONGODB_URL) ;
        console.log('Connected to mongodb')
    }catch(err){
        throw new Error(err)
    }
}

module.exports = dbConnection
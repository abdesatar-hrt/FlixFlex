const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        poster:{
            type:String,
            required:true,
        },
        trailer: { type: String }
        // we can add more fields this is just a test
    }
);


//Export the model
module.exports = mongoose.model('Movie', userSchema);
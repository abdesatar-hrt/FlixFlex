const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        favorites: [{ type: String }]
    }
);

userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (entredPassword){
    return await bcrypt.compare( entredPassword, this.password);
}


//Export the model
module.exports = mongoose.model('User', userSchema);
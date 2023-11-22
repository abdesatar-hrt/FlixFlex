const generateToken = require('../config/jwtToken');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler');
const generateRefreshToken = require('../config/refreshToken');


const createUser = asyncHandler(async (req, res) => {
    const username = req.body.username;
    const findUser = await User.findOne({username:username})

    if(!findUser) {
        const newUser = User.create(req.body);
        res.json(newUser);
    }else{
        return res.status(404).json({ error: 'User alrady Exists' });
    }
})

const loginUser = asyncHandler(async(req, res, next) => {
    const{username, password} = req.body;
    const findUser = await User.findOne({username})
    if (findUser && await findUser.isPasswordMatched(password)){
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateusertoken = await User.findByIdAndUpdate(findUser.id, {
            refreshToken : refreshToken,
        },{
            new : true
        });
        res.cookie(
            "refreshToken" , refreshToken,
            {httpOnly : true,
            maxAge : 72 * 60 * 60 * 1000}
        )
        res.json({
            _id: findUser._id,
            username: findUser?.firstname,
            token: generateToken(findUser?._id)
        });
    }else{
        return res.status(404).json({ error: 'Invalid credentials' });
    }
});


module.exports = {createUser, loginUser}
const jwt = require('jsonwebtoken');

function generateRefreshToken(id) {
    return jwt.sign({id}, process.env.JWT_SECRET, { 'expiresIn': "3d" });
}

module.exports = generateRefreshToken;
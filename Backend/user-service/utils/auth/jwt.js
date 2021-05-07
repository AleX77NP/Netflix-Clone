const jwt = require('jsonwebtoken')

function generateToken(user) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    return accessToken;
}

module.exports = generateToken;
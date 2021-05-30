const jwt = require('jsonwebtoken')

function generateToken(email) {
    const payload = {
        user: email
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
    return accessToken;
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = decoded.user

        return user;
    } catch(e) {
        console.log(e)
        return null
    }
}

module.exports = {generateToken, verifyToken};
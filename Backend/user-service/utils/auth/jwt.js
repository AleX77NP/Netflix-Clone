const jwt = require('jsonwebtoken')

function generateToken(id) {
    const payload = {
        user: id
    }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
    return accessToken;
}

module.exports = generateToken;
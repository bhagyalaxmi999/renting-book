// json webtoken given secreat key  to validate
const jwt = require('jsonwebtoken')

const createLoginToken = (id) => {
    return jwt.sign(id, process.env.SECRET_TOKEN, { expiresIn: '1d'})
}
module.exports = { createLoginToken } //typed or const or named exports

// expressed in second or a string describing a time span  2eit/ms eg: "2 days", 10h", "7d"
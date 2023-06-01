const authRoute = require('express').Router()
const authController = require('../controller/authController')

authRoute.post(`/register`, authController.register)
authRoute.post(`/login`, authController.login)
authRoute.get(`/logout`, authController.logout)
authRoute.get(`/current/user`, authController.currentUser)
authRoute.get(`/token`, authController.authToken)

module.exports = authRoute
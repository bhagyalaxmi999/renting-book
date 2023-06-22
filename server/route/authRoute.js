const authRoute = require('express').Router()
const authController = require('../controller/authController')
const authMiddleware = require('../middleware/authMiddleware')
const adminAuth = require('../middleware/adminAuth')

authRoute.post(`/register`, authController.register)
authRoute.post(`/login`, authController.login)
authRoute.get(`/logout`, authController.logout)
// read current user
authRoute.get(`/current/user`, authMiddleware, authController.currentUser)
// login token
authRoute.get(`/token`, authController.authToken)
// read all
authRoute.get(`/all/users`,authMiddleware, adminAuth, authController.allUsers)
// patch
authRoute.patch(`/user/:id`,authMiddleware, adminAuth, authController.blockUser)
// delete
authRoute.delete(`/user/:id`,authMiddleware, adminAuth, authController.deleteUser)

module.exports = authRoute
const bookRoute = require('express').Router()
const bookCtrl = require('../controller/bookController')

const authMiddleware = require('../middleware/authMiddleware')
const adminAuth = require('../middleware/adminAuth')


bookRoute.get(`/all`, authMiddleware, bookCtrl.getAll)
bookRoute.get(`/single/:id`, authMiddleware, bookCtrl.getSingle)
bookRoute.post(`/create`, authMiddleware, adminAuth, bookCtrl.create)
bookRoute.patch(`/update/:id`, authMiddleware,adminAuth, bookCtrl.update)
bookRoute.delete(`/delete/:id`, authMiddleware,adminAuth, bookCtrl.delete)

module.exports = bookRoute
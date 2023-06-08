const bookRoute = require('express').Router()
const bookCtrl = require('../controller/bookController')

bookRoute.get(`/all`, bookCtrl.getAll)
bookRoute.get(`/single/:id`, bookCtrl.getSingle)
bookRoute.post(`/create`, bookCtrl.create)
bookRoute.patch(`/update/:id`, bookCtrl.update)
bookRoute.delete(`/delete/:id`, bookCtrl.delete)

module.exports = bookRoute
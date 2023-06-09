const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connect = require('./db/connect')
const PORT = process.env.PORT

const app = express()

// body parser settings
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// middleware
app.use(cors()) // cross origin Resource sharing to allow incoming request
app.use(cookieParser(process.env.SECRET_TOKEN)) //configure secured cookies

// index route
app.use(`/api/auth`, require('./route/authRoute'))
app.use(`/api/category`, require('./route/categoryRoute'))
app.use(`/api/book`, require('./route/bookRoute'))
app.use(`/api/rent`, require('./route/rentRoute'))

// default route
app.all(`**`, async(req,res) => {
    return res.status(404).json({msg: 'Requested path not found..404 error'})
})

// to start the server
app.listen(PORT, async() => {
    console.log(`server is up and running @ http://localhost:${PORT}`)
    await connect()
})
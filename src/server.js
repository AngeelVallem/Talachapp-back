const express = require('express')
const cors = require('cors')

const paymentRouter = require('./routers/payment')
const usersRouter = require('./routers/users')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/pay' , paymentRouter)


module.exports = app
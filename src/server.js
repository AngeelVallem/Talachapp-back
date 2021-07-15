const express = require('express')
const cors = require('cors')

const paymentRouter = require('../src/routers/payment')
const usersRouter = require('../src/routers/user')
const ticketsRouter = require('../src/routers/tickets')

const app = express()

 app.use(cors())
 app.use(express.json())

 app.use('/users' , usersRouter)
 app.use('/tickets' , ticketsRouter)
app.use('/pay' , paymentRouter)


module.exports = app
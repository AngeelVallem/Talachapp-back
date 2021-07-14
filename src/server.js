const express = require('express')
const cors = require('cors')

const paymentRouter = require('../src/routers/payment')
const usersRouter = require('../src/routers/user')

const app = express()

 app.use(cors())
 app.use(express.json())

app.use('/users' , usersRouter)
app.use('/pay' , paymentRouter)


module.exports = app
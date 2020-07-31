import express from 'express'
require('./db/mongoose')
//import dbconnection from './db/mongoose'
import userRouter from './routers/user'

const app = express()
app.use(express.json())
app.use(userRouter)
const port = process.env.port || 3000

app.listen(port,() => {
    console.log('app is listening on port ' + port)
})


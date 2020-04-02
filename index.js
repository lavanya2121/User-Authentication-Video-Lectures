const express=require('express')
const setupDB=require('./config/database')
const router=require('./config/routes')
//const {User}=require('./app/models/User')
//npm install cors
const cors=require('cors')

//3rd video
const {usersRouter} =require('./app/controllers/UsersController')

// const {messagesRouter} = require('./app/controllers/messagesController')
// app.use('/messages', messagesRouter)

const app=express()
const port=3070

app.use(express.json())
app.use('/users',usersRouter)

//middlewares
app.use(cors())
app.use(express.json())
app.use('/',router)

//db configuration
setupDB()

app.listen(port,()=>{
    console.log('listening on port',port)
})
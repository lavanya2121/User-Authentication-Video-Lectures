// const Message = require('../models/message')
// const { authenticateUser } = require('../middlewares/authentication')
// const express = require('express')
// const router = express.Router() 

// router.get('/', authenticateUser, (req, res) => {
    
// })

// router.post('/', authenticateUser, (req, res) => {
//     const body = req.body 
//     const message = new Message(body)
    
//     message.save()
//         .then(message => res.json(message))
//         .catch(err => res.json(err))
// })

// module.exports = {
//     messagesRouter: router
// }
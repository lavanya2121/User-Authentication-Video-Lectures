// const mongoose = require('mongoose')
// const Schema = mongoose.Schema 

// const messageSchema = new Schema({
//     title: {
//         type: String, 
//         required: true
//     },
//     user: {
//         type: Schema.Types.ObjectId, 
//         required: true, 
//         ref: 'User'
//     }
// })

// const Message = mongoose.model('Message', messageSchema)

// module.exports = Message 


//crud
// router.get('/:id', authenticateUser, (req, res) => {
//     const id = req.params.id 
//     Message.findOne({
//         _id: id,
//         user: req.user._id 
//     })
//     .then(message => {
//         if(message) {
//             res.json(message)
//         } else {
//             res.json({})
//         }
//     })
// })

// put 
// Message.findOneAndUpdate({ _id: id, user: req.user._id})
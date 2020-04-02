const express=require('express')
// const bcryptjs=require('bcryptjs')
const router=express.Router()
const {User}=require('../models/User')//to instantiate the user obj
const {authenticateUser}=require('../middlewares/authentication')
const _=require('lodash')//to send only the selected fields as the response we need to install lodash package

//localhost:3070/users/register
router.post('/register',function(req,res){
    const body=req.body
    // console.log(body)
    const user=new User(body)
    user.save()
        .then(function(user){
            // res.send(user)//to send the entire user object
            res.send(_.pick(user,['_id','username','email']))//to send only the selected fields
        })
        .catch(function(err){
            res.send(err)
        })
    // res.send("registration")
})


//localhost:3070/users/login
router.post('/login',function(req,res){
    const body=req.body

    //defining our own methods
    User.findByCredentials(body.email,body.password)
         .then(function(user){
            //  res.send(user)
           return  user.generateToken()//instance method
         })
         .then(function(token){
             res.setHeader('x-auth',token).send({})
         })
         .catch(function(err){
             res.send(err)
         })

    // User.findOne({ email: body.email })==>moved to the model
    // .then(function(user){
    //     if(!user){
    //         res.status('404').send('invalid email/password')
    //     }

    //     bcryptjs.compare(body.password,user.password)
    //     .then(function(result){
    //         if(result) {
    //             res.send(user)
    //         }else {
    //             res.status('404').send('invalid email/password')
    //         }
    //     })
    // })
    // .catch(function(err){
    //     res.send(err)
    // })
})

//localhost:3070/users/account
router.get('/account',authenticateUser,function(req,res){
    const {user}=req
    // res.send(user)//to send the entire user obj
    res.send(_.pick(user,['_id','username','email']))//to send only the selected fields
    
})



//localhost:3070/users/logout
router.delete('/logout',authenticateUser,function(req,res){
    const {user,token}=req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
          .then(function(){
              res.send({notice:'successfully logged out'})
          })
          .catch(function(err){
              res.send(err)
          })

})


module.exports={
    usersRouter:router
}
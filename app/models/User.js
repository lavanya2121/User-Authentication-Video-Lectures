0//we need the validator package
const validator=require('validator')
const mongoose=require('mongoose')
const becryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Schema=mongoose.Schema

const userSchema=new Schema({
    username:{
        type:String,
        //validations
        required:true,
        unique:true,
        minlength:5
    },
    email:{
        type:String,
        //validations
        required:true,
        unique:true,
        // how to chk the format of the email
        // custom validation--install validator package
        // npm install --save validator
        // chk mongoose custom validators--docs
        validate:{
            validator:function(value){
                return (validator.isEmail(value))//validation has passed
            },
            message:function(){
                return 'Invalid Email Format'
            }
        }
    },
    password:{
        type:String,
        //validations
        required:true,
        minlength:6,
        maxlength:128

    },
    tokens:[//tokens is an array he can login from any of the devices//whenever user logsin we will be generating a token and when the user logsout we will be removing the token
        {
            token:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }

    ]
})

//pre hooks
//before saving the user record into the db we need to encrypt the password
userSchema.pre('save',function(next){
    //instance method
    const user=this//this refers to the user obj in the usersCntroller user.save()
    if(user.isNew){//only if the user record is new-->while registering
        becryptjs.genSalt(10)
        .then(function(salt){
            becryptjs.hash(user.password,salt)
            .then(function(encryptedPassword){
                user.password=encryptedPassword
                next()
            })
        })

    }else{
        next()
    }
})

//own static method
userSchema.statics.findByToken=function(token){
    const User=this

    let tokenData
    try{
        tokenData=jwt.verify(token,'jwt@123')
    }catch(err){
        return Promise.reject(err)

    }

    return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
    
}

//own instance method
userSchema.methods.generateToken=function(){
    const user=this
    const tokenData={
        _id:user._id,
        username:user.username,
        createdAt:Number(new Date())

    }
    //generating the actual token
    const token=jwt.sign(tokenData,'jwt@123')
    user.tokens.push({
        token
    })
   return user.save()
         .then(function(user){
             return Promise.resolve(token)
         })
         .catch(function(err){
             return Promise.reject(err)
         })
}

//own static methods
userSchema.statics.findByCredentials=function(email,password){
    const User=this
    return User.findOne({email:email})
             .then(function(user){
                 if(!user){
                     return Promise.reject('invalid email/password')
                 }

                 return becryptjs.compare(password,user.password)
                        .then(function(result){
                            if(result){
                                return Promise.resolve(user)
                                 //  return new Promise(function(resolve,reject){
                                //      resolve(user)
                                //  })
                            }else{
                                return Promise.reject('invalid email/password')
                            }
                        })
             })
             .catch(function(err){
                 return Promise.reject(err)
                //  return new Promise(function(resolve,reject){
                //      reject(err)
                //  })
             })
}

const User=mongoose.model('User',userSchema)

module.exports={
    User:User
}
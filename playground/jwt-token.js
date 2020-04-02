const jwt=require('jsonwebtoken')

//payload
const tokenData={//js obj
    id:1,
    username:"user1"
}

const token=jwt.sign(tokenData,'jwt@123')//secret key//private key
console.log(token)

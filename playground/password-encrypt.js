const bcryptjs=require('bcryptjs')

const password='secret123'

bcryptjs.genSalt(10)//10 is enough
    .then(function(salt){
        console.log(salt)
        bcryptjs.hash(password,salt)
        .then(function(encrptedPassword){
            console.log(encrptedPassword)
        })
    })
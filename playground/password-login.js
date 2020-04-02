const bcryptjs=require('bcryptjs')

const encrypted='$2a$10$f1T5TzUVNwuBAjRW0jvDCO1YOLsDTRmqHJ86ZSpvk3d9azlictabu'

const password='secret123'

bcryptjs.compare(password,encrypted)
        .then(function(result){
            console.log(result)
        })

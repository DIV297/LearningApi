const jwt = require('jsonwebtoken');
const JWT_SECRET = 'DivanshSignature'
const fetchuser =(request, response, next)=>{
    // to convert auth token into user details
    const token = request.header('auth-token');
    if(!token){
        response.status(401).send({error:"Please authenticate using adfs valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        request.user= data.user;
        next()
    }catch(error){
       return response.status(401).send({error:"Please authenticate using a valid token"})
    }
}

module.exports = fetchuser;
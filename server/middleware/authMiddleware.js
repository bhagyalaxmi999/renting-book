const jwt = require('jsonwebtoken')

const authMiddleware = async(req, res, next) => {
  try {

//     // header
    const token = req.header('Authorization')

    jwt.verify(token, process.env.SECRET_TOKEN, (err,user)=> {
        if(err)
          
            return res.status(404).json({ msg:`token expired..login Again ,UnAUTHORISED TOKEN ,token not found`})
       
        // res.json( { user }) //1st check
        req.user= user//assigning to request variable
        next()//send data to next controller
     })

    //   res.json({msg: "Auth middleware called",token}) //2nd check
    
  } catch (err) {
       return res.status(500).json({msg:err.message})
   }

 }

module.exports = authMiddleware
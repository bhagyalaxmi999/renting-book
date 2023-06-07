const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const { createLoginToken } = require('../util/token')
const jwt = require('jsonwebtoken')

const authController = {
      register: async (req,res) => {
            try {
               const { name, email, mobile, password } = req.body
               
            //    encrypt the password
               const encPass = await bcrypt.hash(password,10)//10 bit has generate
            
               // checing email already exists or not    

                const extEmail = await User.findOne({ email })
                  if(extEmail)
                     return res.status(400).json({ msg : `${email} already exists.`})
                
                    //  checking mobile number already exists or not
                const extMobile = await User.findOne({ mobile }) 
                  if(extMobile)
                    return res.status(400).json({ msg: `${mobile} number already exists.`})   

               const newUser = await User.create({
                    name,
                    email,
                    mobile,
                    password: encPass
                })

               res.json({ msg: "Registered successfully. ",data: newUser})
            } catch (err) {
                return res.status(500).json({msg: err.message}) 
            }
      },
      login: async (req,res) => {
            try {

                const { email, password } = req.body
                
                // user email exists or not
                const extUser = await User.findOne({ email })
                   if(!extUser)
                       return res.status(404).json({ msg: `${email} doesn't exists`})
                
                // compare the password
                const isMatch = await bcrypt.compare(password, extUser.password)
                    if(!isMatch)
                       return res.status(400).json({ msg: `password are not matched..`})
                
               // if account is blocked admin false ayitey
                   if(!extUser.isActive)
                       return res.status(400).json({ msg: `Hi ${extUser.name},sorry your account is blocked.contact Admin..`})

                //    generate login token
                const  token = createLoginToken({ id: extUser._id })

                // save the token in cookies
                    res.cookie('loginToken', token, {
                        httpOnly:true,
                        signed:true,
                        path: `/api/auth/token`,
                        maxAge: 1* 24 * 60 * 60 * 1000
                        
                    })

                   res.json({ msg: "Login Successfully", token})
            
            
            } catch (err) {
                return res.status(500).json({msg: err.message}) 
            }

      },
      logout: async(req,res) => {
            try {
                res.clearCookie('loginToken', {path:`/api/auth/token`})
                res.json({ msg: 'logout successfully'})

            } catch (err) {
                return res.status(500).json({msg: err.message}) 
            }

      },
      currentUser: async (req,res) => {
            try {
                const data= await User.findById({_id: req.user.id}).select("-password")
                    if(!data) 
                        return res.status(404).json({ msg:`Requested user not found`}) 
               
                        //  res.json({ msg: 'currentuser called'}) //middle ware to pass to the current user
                // res.json({msg: req.user})2nd check
                res.json({ currentUser: data })
            } catch (err) {
                return res.status(500).json({msg: err.message}) 
            }

      },
      authToken: async (req,res) => {
            try {
                const  cToken = req.signedCookies.loginToken
                    if(!cToken) 
                       return res.status(404).json({ msg: "Token not found,Session Expired"})
                //  res.json({ cToken })   //ist ctoken checked generate
                // verify login token
                    jwt.verify(cToken, process.env.SECRET_TOKEN, (err,user) => {
                        if(err)
                        return res.status(400).json({msg: `Invalid Token..Un Authorized..`})
                           
                        // res.json({user})
                        // regenerate the token
                        const rToken = createLoginToken({ id: user.id})
                       
                        res.json({ authToken: rToken})
                    })
            } catch (err) {
                return res.status(500).json({msg: err.message}) 
            }

      }
}

module.exports = authController
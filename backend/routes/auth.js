const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User=  mongoose.model("User")
const bcrypt  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../Keys')
const requireLogin = require('../middleware/requireLogin')

// router.get('/protected',requireLogin,(req,res)=>{
//     res.send("hello user")
// })

router.post('/signup',(req,res)=>{
    // console.log(req.body.name)
    const {name,email,password,pic}  =req.body
    if(!name || !email || !password)
    {
       return res.status(404).json({error:"Please fill up all fields.."})
    }
    
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser)
        {
            return res.status(404).json({error:"user already exists.."})
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
            const user = new User({
                email,
                password: hashedpassword,
                name,
                pic
            })
            user.save()
                .then(user=>{
                res.json({message:"Login In successfully!!"})
            })
                .catch(err=>{
                    console.log(err)
                })
        })
        
        
    }) 
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password} =req.body

    if(!email || !password){
      return  res.status(404).json({error:"please enter valid email or passward"})
    }
    User.findOne({email:email}) //email checking
        .then(savedUser=>{
            if(!savedUser){
                return res.status(404).json({error:"Invalid email or passwaord"})
            }
        
        bcrypt.compare(password,savedUser.password) //password checking
                .then(doMatch=>{
                    if(doMatch)
                    {
                        // res.json({message:"signin successfully"})
                        const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                        const {_id,name,email,followers,following,pic} = savedUser
                        res.json({token,user:{_id,name,email,followers,following,pic}})
                    }
                    else{
                       return res.status(404).json({error:"Invalid email or password"})
                    } 
                })
                .catch(err=>{
                    console.log(err);  //if error generated from devlopment side or databsae side
                })
            })
    
})

module.exports = router 
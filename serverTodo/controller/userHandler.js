const { compare } = require("bcrypt");
const User = require("../models/user");
const { tryCatcher, ErrorHandler } = require("../utility/errorHandler");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const { generateToken } = require("../utility/feature");

const signUpHandler=tryCatcher(async(req,res,next)=>{
    const { name, email, password,role } = req.body;

    let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("Email already exists",400));
    
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ name, email, password: hashedPassword,
      });
    
      await user.save();
      generateToken(res,user,201,"User Created");
})

const loginHandler=tryCatcher(async(req,res,next)=>{
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');

    if (!user) return(next(new ErrorHandler("Invalid Username",400)));
    
    const isMatch=await compare(password,user.password);

    if (!isMatch) return(next(new ErrorHandler("Invalid Password",403)));

    generateToken(res,user,201,"Welcome Back")

})

const googleHandler=tryCatcher(async(req,res,next)=>{
    const token=await jwt.sign({id:req.user._id},process.env.JWT_SECRET,{
        expiresIn: "7d",
    })
    res.cookie("TodoToken", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    // res.json({msg:req.user})
    // generateToken(res,req.user,201,"Welcome");
    console.log("wwww")
    res.redirect('http://localhost:5173/Todo')
})

const githubHandler=tryCatcher(async(req,res,next)=>{
    const token=await jwt.sign({id:req.user._id},process.env.JWT_SECRET,{
        expiresIn: "7d",
    })
    console.log("Github")
    res.cookie("TodoToken", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    // res.json({msg:req.user})
    // generateToken(res,req.user,201,"Welcome");
    console.log("wwww")
    res.redirect('http://localhost:5173/Todo')
})

const logoutHandler=tryCatcher(async(req,res,next)=>{
    req.session.destroy((err)=>{
        if(err){
            return next(new ErrorHandler("Logout Failed",500))
        }
        res.clearCookie("TodoToken")
        res.clearCookie("Sessiony");
        res.clearCookie("__Host-GAPS");
        // res.redirect("https://accounts.google.com/logout")
        res.json({success:true,message:"logged out"})
    })
})

module.exports={signUpHandler,loginHandler,googleHandler,githubHandler,logoutHandler}
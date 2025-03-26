const express=require('express');
const { userAuth } = require('../middleware/Auth');
const { logoutHandler, githubHandler, googleHandler, signUpHandler, loginHandler } = require('../controller/userHandler');
const passport = require('passport');
const route=express.Router();


route.post("/login",loginHandler);
route.post("/signup",signUpHandler);

route.get("/auth/google",passport.authenticate("google", { scope: ["profile", "email"] }));

route.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    googleHandler)

// githubHandler
route.get("/auth/github",(req,res,next)=>{
    console.log("fit")
    next()
},passport.authenticate('github',{scope:['user:email']})
)

route.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    githubHandler
)

route.use(userAuth)

route.post('/logout',logoutHandler)

module.exports=route;

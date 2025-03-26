require('dotenv').config();
const express = require('express');
const cors=require('cors');
const taskRoute=require('./routes/task.js');
const { ErrorMiddleware } = require('./utility/errorHandler');
const connectDB =require('./utility/connectDb.js');
const session=require('express-session');
const passport = require('passport');
const cookieParser=require('cookie-parser')
const userRoute=require('./routes/user.js')
require('./middleware/passportAuth.js')

connectDB("mongodb://localhost:27017/TodoList");
const app=express();

app.use(cors({
    origin:"http://localhost:5173"
    ,credentials:true,
    methods:['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
    })
);

app.use(
    session({
        secret:"cats",
        resave:false,
        name:"Sessiony",
        saveUninitialized:false,
        cookie:{secure:false,
            httpOnly:true,
            maxAge:7 * 24 * 60 * 60 * 1000

        }
    })
)

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/task',taskRoute);
app.use('/',userRoute);
app.use(ErrorMiddleware)


app.listen(3000,()=>{
    console.log("Server running on port 3000");
    
})
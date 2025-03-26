const mongoose=require('mongoose');

const connectDb=(url)=>{
  mongoose.connect(url)
    .then(d=>console.log("Connected To Db"))
    .catch((err)=>{
      throw err;
    })  
}

module.exports=connectDb;
const jwt=require('jsonwebtoken')
const cookieOptions={
    httpOnly: true, // Prevents XSS attack
    secure: false, // Change to true in production with HTTPS
    sameSite: "Lax",
}

const generateToken=(res,user,code,msg)=>{
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
  });

  const {password,...userWithoutPassword}=user.toObject()

  res.status(code).cookie("TodoToken", token,cookieOptions)
    .json({success:true,user:userWithoutPassword,msg});

}

module.exports={generateToken}
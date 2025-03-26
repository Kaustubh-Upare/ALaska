import { GitHub, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Container, Divider, Grid, IconButton, TextField, Typography, Box, Paper } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setconfirmPassword]=useState("");
  const [isLoading,setisLoading]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState(false);
  const [errorP, setErrorP] = useState(false);
  const [errorPc,setErrorPc]=useState(false);
  const [helperText, setHelperText] = useState("");
  const [helperTextP, setHelperTextP] = useState("");
  const [helperTextpc,setHelperTextpc]=useState("");

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError(true);
      setHelperText("Please enter a valid email address.");
    } else {
      setError(false);
      setHelperText("");
    }
  };
  const validatePassword=()=>{
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      setErrorP(true);
      setHelperTextP("Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.");
    } else {
      setErrorP(false);
      setHelperTextP("");
    }
  
    if (password && confirmPassword && password !== confirmPassword) {
      setErrorPc(true);
      setHelperTextpc("Passwords do not match.");
    } else {
      setErrorPc(false);
      setHelperTextpc("");
    }
  }

  const handleSignup=async()=>{
      
    if(error === false && errorP === false){
     setisLoading(true);
     const toastId=toast.loading("wait a couple of minutes");
     try {
         const name=`${firstName} ${lastName}`;
         const {data}=await axios.post("http://localhost:3000/signup",{name,email,password},
         {
           withCredentials:true,
           headers:{"Content-Type":"application/json"}
         })
         
         console.log(data)
        toast.success(data?.msg,{id:toastId});
          navigate('/Todo')
          }catch (error) {
           console.log(error)
           toast.error(error?.response?.data?.message || "Something Went Wrong",{id:toastId}) 
         }finally {
           setisLoading(false);
         }
       }else{
         toast.error("Check The above input properly")
       }
}
const githubHandler=()=>{
  try {
    window.location.href = "http://localhost:3000/auth/github";
      console.log(data)   
      navigate('/Todo')
  } catch (error) {
      console.log(error)
  }
}

const googleLogin = async() => {
  try {
    window.location.href = "http://localhost:3000/auth/google";
      console.log(data)
      
      navigate('/Todo')
      // window.location.href="/dashboard";
  } catch (error) {
      console.log(error)
  }
 };
  
  return (
    
    <Container maxWidth="sm"
     sx={{ display: "flex" ,justifyContent: "center", alignItems: "center", height: "100vh",
      backgroundColor: "#222"
      }}
     >
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 450, textAlign: "center",
        backgroundColor:"rgb(255, 255, 255)"
       }}>
        <Typography variant="h4" fontWeight={600} fontFamily="Poppins" color="rgb(68, 66, 66)" gutterBottom>
          Sign Up
        </Typography>

        <Grid container>
        <Grid item xs={6}>
            <TextField
            label="First Name"
            defaultValue="Team"
            variant="outlined"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
        fullWidth
        sx={{
        '& .MuiOutlinedInput-root': {
         '& fieldset': {
            borderColor: 'rgb(68, 65, 65)', 
          }
        }
      }}
      InputLabelProps={{
        shrink: true, // Keeps the label visible even when not focused
      }}
    />
            </Grid>
            <Grid item xs={6}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              defaultValue="Sync"
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'rgb(68, 65, 65)', 
                  }
                }
              }}
              InputLabelProps={{
                shrink: true, 
              }}
            />
            </Grid>
        </Grid>

        <TextField
          label="Email"
          onBlur={validateEmail}
          value={email}
          error={error}
          helperText={helperText}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@gmail.com"
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )
          }}
        />
        <TextField fullWidth label="Confirm Password" 
            type={showConfirmPassword ? 'text' : 'password'} 
            InputLabelProps={{
              shrink: true, // Keeps the label visible even when not focused
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowConfirmPassword((p)=>!p)} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
            value={confirmPassword}
            onChange={(e)=>setconfirmPassword(e.target.value)}
            onBlur={validatePassword}
            error={errorPc}
            helperText={helperTextpc}
            margin='normal'
            sx={{
              '& .MuiOutlinedInput-root': {
               '& fieldset': {
                  borderColor: 'rgb(68, 65, 65)', 
                }
              }
            }}
            variant="outlined" />
            

        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleSignup}
          size="large"
          sx={{ mt: 2, backgroundColor: "#1565C0" }}
        >
          <Typography variant="caption">Sign In</Typography>
        </Button>

        <Typography align="center" variant="body2" fontWeight={500} color="rgb(66, 65, 65)" mt={2}>
          Create an account?{" "}
          <Typography component="span" variant="body1" color="primary" sx={{ cursor: "pointer" }} onClick={() => navigate('/signup')}>
            Sign Up
          </Typography>
        </Typography>

        <Divider sx={{ my: 2, color: "rgb(104, 100, 100)" }}>Or Sign in with</Divider>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHub />}
              sx={{ textTransform: "none", color: "black", borderColor: "gray", "&:hover": { borderColor: "black" } }}
              onClick={githubHandler}
            >
              GitHub
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{ textTransform: "none", color: "black", borderColor: "gray", "&:hover": { borderColor: "black" } }}
              onClick={googleLogin}
            >
              Google
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Signup;

import { GitHub, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Container, Divider, Grid, IconButton, TextField, Typography, Box, Paper } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:3000/login", { email, password }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      toast.success(data?.msg);
      navigate('/Todo');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = () => window.location.href = "http://localhost:3000/auth/google";
  const githubLogin = () => window.location.href = "http://localhost:3000/auth/github";

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

  return (
    
    <Container maxWidth="sm" sx={{ display: "flex" ,justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 450, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={600} fontFamily="Poppins" color="rgb(68, 66, 66)" gutterBottom>
          Sign In
        </Typography>

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

        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoading}
          onClick={handleLogin}
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
              onClick={githubLogin}
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

export default Signin;

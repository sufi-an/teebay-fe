import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMutation, gql } from "@apollo/client";
import { LoginUserMutation } from "../../graphql/Auth/Mutations";
import { saveLoginData } from "../../utils/auth";
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

  const navigate = useNavigate();
  // graphql query
  const [login, { error }] = useMutation(LoginUserMutation);
  
   const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const inputData = new FormData(event.currentTarget);

    const status = await login({
      variables: {
        email: inputData.get('email'),
        password :  inputData.get("password").toString(),
        
      },
    });
    if(status.data.login){
      saveLoginData(status.data.login)
      redirectTo('/home')

    }

    if (error) {

      redirectTo('/')
    }
      
    } catch (error) {
      alert('No userfound')
      redirectTo('/')
    }
    
  };
  const redirectTo=(path)=>{
   
      navigate(path);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
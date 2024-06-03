import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import UserService from "./UserService/UserService";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      fontSize={16}
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://relevantz.com/"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {props.title}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [signUp, setSignUp] = React.useState({
    phone: "",
    username: "",
    email: "",
    password: "",
  });

  //Using Helper Text to Raise a Warning
  const [errors, setErrors] = React.useState({
    phone: "",
    username: "",
    email: "",
    password: "",
  });
  // email validation
  const emailregEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  // Password strength check
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    console.log(signUp);

    UserService.userSignUp(signUp)
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        if (res.status === 200) {
          Swal.fire({
            title: "Registration Successfully!",
            text: "Move Back to Login Page!",
            icon: "success",
          });

          setTimeout(() => {
            window.location.href = "/userLogin";
          }, 3000);
        }

        if (res.status === 201) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "UserName is Already taken,Try with Another Name!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
        if (res.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "UserName and Email Id is Already taken,Try with Another Name!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      })
      .catch((err) => console.error(err.status));
  };

  const handleChange = (e) => {
    console.log("handleChange");
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            maxWidth: "500px",
            width: "600px",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            backgroundColor: "white",

            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  onChange={handleChange}
                  onBlur={(e) => {
                    signUp.username === ""
                      ? setErrors({
                          ...errors,
                          [e.target.name]: "Username is required",
                        })
                      : setErrors({
                          ...errors,
                          [e.target.name]: "",
                        });
                  }}
                  required={true}
                  fullWidth
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                  id="username"
                  label="User Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  onChange={handleChange}
                  fullWidth
                  onBlur={(e) => {
                    signUp.email === "" || !emailregEx.test(signUp.email)
                      ? setErrors({
                          ...errors,
                          [e.target.name]: "Email should be Right Format",
                        })
                      : setErrors({
                          ...errors,
                          [e.target.name]: "",
                        });
                  }}
                  id="email"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  onChange={handleChange}
                  fullWidth
                  onBlur={(e) => {
                    signUp.phone === "" || signUp.phone.length < 10
                      ? setErrors({
                          ...errors,
                          [e.target.name]: "PhoneNo is Min 10 numbers",
                        })
                      : setErrors({
                          ...errors,
                          [e.target.name]: "",
                        });
                  }}
                  id="phone"
                  label="Phone No"
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                  name="phone"
                  type="number"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  onBlur={(e) => {
                    signUp.password === "" ||
                    !passwordRegex.test(signUp.password)
                      ? setErrors({
                          ...errors,
                          [e.target.name]:
                            "Password must be at least 6 characters with at least one uppercase and one lowercase letter",
                        })
                      : setErrors({
                          ...errors,
                          [e.target.name]: "",
                        });
                  }}
                  name="password"
                  label="Password"
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/userLogin"
                  variant="body2"
                  style={{ textDecoration: "none", fontSize: "15px" }}
                >
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright title={"Prasanth Baskaran"} sx={{ mt: 5, mr: 5 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

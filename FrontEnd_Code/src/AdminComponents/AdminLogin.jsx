import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AdminService from "./Service/AdminService";

const AdminLogin = () => {
  const [login, setLogin] = React.useState({
    nameOrEmail: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({
    nameOrEmail: "",
    password: "",
  });

  //session storage
  const currentTime = new Date().getHours();
  const win = window.sessionStorage;
  const [sopen, setSOpen] = React.useState(false);

  let greeting = "";
  if (currentTime < 12) {
    greeting = "Good morning!";
  } else if (currentTime < 18) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good evening!";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      nameOrEmail: data.get("nameOrEmail"),
      password: data.get("password"),
    });

    console.log(login);
    // check whether  the user is already logged in or not
    if (!win.getItem("isLoggedIn")) {
      try {
        await AdminService.adminSignIn(login)
          .then((res) => {
            console.log(res.status);
            if (res.status === 200) {
              win.setItem("adminId", res.data.adminId);
              win.setItem("adminName", res.data.adminName);
              win.setItem("email", res.data.adminEmail);
              win.setItem("isLoggedIn", true);

              Swal.fire({
                title: "Login Successfully!",
                text: "Your credentials are Validated Successfully!",
                icon: "success",
              });
              setTimeout(() => {
                window.location.href = "/adminHome";
              }, 1000);
            }

            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Check once your Email / Password ?</a>',
            });
          });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "`An error occurred while trying to log you in:\n${handleError(err)}`",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while trying to log you in Again !!!",
      });
    }
  };

  const handleChange = (e) => {
    console.log("handleChange");
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            maxWidth: "500px",
            width: "675px",
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
          <center>
            <h1 className="mt-5" style={{ fontWeight: "bold" }}>
              {" "}
              Welcome, {greeting}
            </h1>
          </center>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Admin Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              sx={{ width: 450 }}
              onChange={handleChange}
              id="nameOrEmail"
              label="Email Address or UserName"
              name="nameOrEmail"
              onBlur={(e) => {
                login.nameOrEmail === ""
                  ? setErrors({
                      ...errors,
                      [e.target.name]: "Required",
                    })
                  : setErrors({
                      ...errors,
                      [e.target.name]: "",
                    });
              }}
              error={Boolean(errors.nameOrEmail)}
              helperText={errors.nameOrEmail}
              autoComplete="email"
              required={true}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              onChange={handleChange}
              onBlur={(e) => {
                login.password === ""
                  ? setErrors({
                      ...errors,
                      [e.target.name]: "Required",
                    })
                  : setErrors({
                      ...errors,
                      [e.target.name]: "",
                    });
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              required={true}
            />
            <FormControlLabel
              required
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link
                  style={{ textDecoration: "none", fontSize: "16px" }}
                  to="/"
                  variant="body2"
                >
                  forgot password ?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default AdminLogin;

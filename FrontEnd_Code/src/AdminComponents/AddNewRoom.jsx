import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AdminService from "./Service/AdminService";
import Header from "./SideNavbar/Header";

const defaultTheme = createTheme();

export default function AddNewRoom() {
  const [addRoom, setAddRoom] = React.useState({
    roomType: "",
    roomSharing: "",
  });

  const win = window.sessionStorage;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      roomType: data.get("roomType"),
      roomSharing: data.get("roomSharing"),
    });
    console.log(addRoom);

    const id = win.getItem("adminId");

    AdminService.addNewRoomDetails(id, addRoom)
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        if (res.status === 200) {
          Swal.fire({
            title: "Room Created Successfully!",
            text: "Move Back to DashBoard!",
            icon: "success",
          });

          window.location.href = "/adminHome";
        }

        if (res.status === 201) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Room Creation Have a Problem !",
            footer: '<a href="/adminHome">Wait for Some more Time issue?</a>',
          });
        }
      })
      .catch((err) => console.error(err.status));
  };

  const handleChange = (e) => {
    console.log("handleChange");
    setAddRoom({ ...addRoom, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
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
              <Home />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add New Room Details
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, width: 450 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Room Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      name="roomType"
                      label="Room Type"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="">Select One</MenuItem>
                      <MenuItem value={"Ac"}>AC</MenuItem>
                      <MenuItem value={"Non Ac"}>NON AC</MenuItem>
                    </Select>
                    <FormHelperText>
                      Select your room type is AC / NON AC
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, width: 450 }}>
                    <InputLabel id="demo-simple-select">
                      Room Sharing
                    </InputLabel>
                    <Select
                      labelId="demo-simple"
                      id="demo-sample"
                      label="Room Sharing"
                      onChange={handleChange}
                      name="roomSharing"
                      required
                    >
                      <MenuItem value="">Select One</MenuItem>
                      <MenuItem value={1}>Single Bed</MenuItem>
                      <MenuItem value={2}>Two Sharing</MenuItem>
                      <MenuItem value={3}>Three Sharing</MenuItem>
                    </Select>
                    <FormHelperText>
                      Select your Room Sharing Type
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
              >
                Add Room
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    to="/adminHome"
                    variant="body2"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                  >
                    {"Go Back To DashBoard"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

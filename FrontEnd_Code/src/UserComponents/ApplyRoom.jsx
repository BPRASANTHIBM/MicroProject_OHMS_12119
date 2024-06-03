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
import { useState } from "react";
import { useParams } from "react-router-dom";
import UserNav from "./UserNav";
import UserService from "./UserService/UserService";

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const defaultTheme = createTheme();

export default function ApplyRoom() {
  const { roomId } = useParams();

  const [applyRoom, setApplyRoom] = React.useState();

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    console.log(file);

    // File type validation
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload a JPEG, PNG, or GIF image.");
      return;
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(
        `File size exceeds ${MAX_FILE_SIZE_MB} MB. Please choose a smaller file.`
      );
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const win = window.sessionStorage;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("data", selectedFile);
    console.log(applyRoom);
    console.log(data);

    const id = win.getItem("userId");
    UserService.applyBooking(applyRoom.idType, id, data, roomId)
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        if (res.status === 200) {
          Swal.fire({
            title: "Room Created Successfully!",
            text: "Move Back to DashBoard!",
            icon: "success",
          });

          window.location.href = "/userSearch";
        }

        if (res.status === 201) {
          Swal.fire({
            title: "Oops...",
            text:
              `Hi ${win.getItem("username")} !` +
              " you Already Have a One Room,Try with Another Account!",
            icon: "question",
          });
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          Swal.fire({
            title: "Oops...",
            text: "UserName is Already Have a One Room,Try with Another Account!",
            icon: "question",
          });
        }
      });
  };

  const handleChange = (e) => {
    console.log("handleChange");
    setApplyRoom({ ...applyRoom, [e.target.name]: e.target.value });
  };

  return (
    <>
      <UserNav />
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
              Apply for Room Request
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, width: 450 }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      ID Proof Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      name="idType"
                      label="idType"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="">Select One</MenuItem>
                      <MenuItem value={"Aadhar Card"}>Aadhar Card</MenuItem>
                      <MenuItem value={"Voter Id"}>Voter Id</MenuItem>
                      <MenuItem value={"Ration Card"}>Ration Card</MenuItem>
                    </Select>
                    <FormHelperText>
                      Select any one your ID proof
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, width: 450 }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="image-file-input"
                      required
                    />
                    <label htmlFor="image-file-input">
                      <Button
                        variant="outlined"
                        className="w-100"
                        component="span"
                      >
                        Select ID proof Image
                      </Button>
                    </label>
                    {error && (
                      <Typography variant="body2" color="error" mt={2}>
                        {error}
                      </Typography>
                    )}
                    <FormHelperText>
                      Select your Authorized ID Proof
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
                Apply Room
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    to="/userSearch"
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

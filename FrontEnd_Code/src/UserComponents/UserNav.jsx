import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";

import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import UserService from "./UserService/UserService";

const UserNav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const win = window.sessionStorage;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const id = win.getItem("userId");

  const handleVerify = () => {
    UserService.verifyStatus(id)
      .then((res) => {
        console.log(res.data);
        if ("pending".match(res.data)) {
          console.log("hello");
          Swal.fire({
            title: "Pending !",
            text:
              `Hello, ${win.getItem("username")} !` +
              "Your request remains pending; please await further updates.",
            icon: "info",
          });
        } else if (res.data === "notbooking") {
          console.log(res.data);
          Swal.fire({
            title: "Not reserving ?",
            text:
              `Hello, ${win.getItem("username")} !` +
              "You are still not resrving any Room !",
            icon: "question",
          });
        } else if (res.data === "Approved") {
          Swal.fire({
            icon: "success",
            title: "Approved !",
            text: "Your request has been approved, and your bed has been allocated!",
            timer: 3000,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleVacateRoom = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure to Vacate?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,

        confirmButtonText: "Yes, vacate it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          UserService.vacateRoom(id).then((res) => {
            if (res.data === true) {
              swalWithBootstrapButtons.fire({
                title: "Vacate with your Room !",
                text: "Thank you for Stayed in this room !",
                icon: "success",
              });
              setTimeout(() => {
                window.location.href = "/userSearch";
              }, 1000);
            } else {
              Swal.fire({
                title: "Oops...",
                text:
                  `Hi ${win.getItem("username")} !` +
                  "You are not a part of this room!",
                icon: "question",
              });
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "You Still in this Room!",
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#1d2634" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              alt="Hostels"
              sx={{
                width: 50,
                height: 50,
              }}
              src="https://www.tmu.ac.in/img/tmu/products/hostel.png"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/userSearch"
              sx={{
                mr: 5,
                display: { xs: "none", md: "flex" },
                fontFamily: "verdana",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
                ml: 2,
              }}
            >
              City Hostels
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Search Rooms</Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Verify Status</Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">View Bill</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "verdana",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              City Hostels
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => {
                  window.location.href = "/userSearch";
                }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: "verdana",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                Search Rooms
              </Button>
              <Button
                onClick={() => {
                  handleVerify();
                }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: "verdana",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                Verify Status
              </Button>
              <Button
                onClick={() => {
                  window.location.href = "/viewBill";
                }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: "verdana",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                View Bill
              </Button>
              <Button
                onClick={() => {
                  handleVacateRoom();
                }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: "verdana",
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                Vacate Room
              </Button>
            </Box>

            {/* Profile Picture image */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open User Details">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <PersonIcon
                    sx={{ fontSize: 40, color: "white" }}
                  ></PersonIcon>
                  <p
                    style={{
                      fontSize: "20px",
                      marginTop: "20px",
                      color: "white",
                      fontWeight: 700,
                      fontFamily: "verdana",
                      letterSpacing: ".2rem",
                    }}
                  >
                    {win.getItem("username") !== null
                      ? win.getItem("username")
                      : "Guest"}
                  </p>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  color: "white",
                  display: "block",
                  fontFamily: "verdana",
                  fontWeight: 700,
                  fontSize: 18,
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* User Icon Buttons */}
                <MenuItem name="menu">
                  <Typography
                    onClick={(e) => {
                      Swal.fire({
                        title: `User Name :${win.getItem("username")}`,
                        text: `User Email : ${win.getItem("email")}`,

                        imageUrl:
                          "https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png",
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: "Custom image",
                      });
                    }}
                    textAlign="center"
                  >
                    Profile
                  </Typography>
                </MenuItem>

                <MenuItem name="menu">
                  <Typography
                    onClick={(e) => {
                      win.clear();
                      window.location.href = "/";
                    }}
                    textAlign="center"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default UserNav;

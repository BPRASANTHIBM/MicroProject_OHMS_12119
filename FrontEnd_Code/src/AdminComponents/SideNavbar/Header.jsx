//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaMoneyBill, FaBookReader } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";
import AdminNavbar from "../AdminNav/AdminNavbar";

const Header = () => {
  //create initial menuCollapse state using useState hook
  const win = window.sessionStorage;

  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <>
      <AdminNavbar />
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>
                {menuCollapse ? (
                  ""
                ) : (
                  <Tooltip title="Admin">
                    <h4 className="fw-bold d-flex justify-content-center mt-3">
                      Admin
                    </h4>
                    <PersonIcon
                      sx={{ fontSize: 40, color: "white" }}
                    ></PersonIcon>
                    <span
                      style={{
                        marginLeft: 15,
                        fontSize: "30px",
                        marginBottom: 0,
                        color: "white",
                      }}
                    >
                      {win.getItem("adminName")}
                    </span>
                  </Tooltip>
                )}
              </p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem className="menu4" icon={<FiHome />}>
                <a href="/adminHome">DashBoard</a>
              </MenuItem>
              <MenuItem className="menu4" icon={<FaList />}>
                <a href="/addNewRoom">Add Rooms</a>
              </MenuItem>
              <MenuItem className="menu4" icon={<FaBookReader />}>
                <a href="/bookingList">Bookings</a>
              </MenuItem>
              <MenuItem className="menu4" icon={<FaMoneyBill />}>
                <a href="/generateBill">Generate Bill</a>
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu className="menu4" iconShape="square">
              <MenuItem
                icon={<FiLogOut />}
                onClick={(e) => {
                  win.clear();
                  window.location.href = "/";
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;

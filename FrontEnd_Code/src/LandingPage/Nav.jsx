import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Nav.css";
import Avatar from "@mui/material/Avatar";

const Nav = () => {
  return (
    <div>
      <div>
        <div>
          <nav
            class="navbar navbar-expand-lg navbar-dark sticky-top"
            id="navbar"
          >
            <Avatar
              alt="Hostels"
              sx={{
                width: 50,
                height: 50,
              }}
              src="https://www.tmu.ac.in/img/tmu/products/hostel.png"
            />
            <div class="container-fluid">
              <a class="navbar-brand" href="/">
                City Hostels
              </a>

              <button
                class="navbar-toggler"
                type="button"
                data-testid="navbar-testId"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-expanded="false"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="navbar" id="navbarSupportedContent">
                <ul class="navbar-nav mx-auto">
                  <li class="nav-item">
                    <a
                      title="Home page Move link"
                      className="nav-link"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      title="About page Move link"
                      className="nav-link"
                      href="#about"
                    >
                      About
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      title="Contact us page Move link"
                      className="nav-link"
                      href="#contactus"
                    >
                      Contact
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      title="User Login page Move link"
                      className="nav-link"
                      href="/userLogin"
                    >
                      Login as User
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      title="Admin Login page Move link"
                      className="nav-link"
                      href="/adminLogin"
                    >
                      Login as Admin
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Nav;

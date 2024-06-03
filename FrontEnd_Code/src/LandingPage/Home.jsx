import React from "react";
import MainCarosel from "../Carosol/MainCarasol";
import Nav from "./Nav";
import "./Home.css";
import Swal from "sweetalert2";
import Typewriter from "typewriter-effect";

const Home = () => {
  return (
    <div>
      <Nav />
      <div>
        {/* <!-- Home Page --> */}

        <section id="home">
          <h1 class="text-center">CITY HOSTELS</h1>
          <p>
            "Explore urban living with City Hostels' premier online management."
          </p>
          <div class="input-group m-4">
            <input
              type="text"
              class="form-control fw-bolder fs-4"
              placeholder="Explore the app..."
            />

            {/* <Typewriter
              options={{
                strings: ["Hello", "World"],
                autoStart: true,
                loop: true,
              }}
            /> */}

            <button
              class="btn signin"
              onClick={() => {
                Swal.fire({
                  title: "<strong>Welcome to City Hostels !</u></strong>",
                  icon: "info",
                  html: `
                  Take a tour of this application, login, and engage with its features.
                `,
                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: false,
                  confirmButtonText: `
                 Great!
                `,
                  confirmButtonAriaLabel: "Thumbs up, great!",

                  cancelButtonAriaLabel: "Thumbs down",
                });
              }}
            >
              Get started
            </button>
          </div>
        </section>

        {/* about page */}
        <section id="about">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-12 my-2">
                <MainCarosel />
              </div>
              <div class="col-lg-6 col-md-6 col-12 p-lg-5 p-2 my-5">
                <h1>ABOUT US</h1>
                <p>
                  Welcome to City Hostels !,We strive to revolutionize the way
                  hostels are managed and experienced. Our platform is designed
                  to simplify hostel management for administrators while
                  enhancing the living experience for residents. Our Mission{" "}
                  <q>
                    Our mission is to streamline hostel operations, making them
                    more efficient, transparent, and accessible for both
                    administrators and residents. We aim to create a seamless
                    platform that fosters a sense of community, safety, and
                    convenience within hostels.
                  </q>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* contact Us page */}
        <section id="contactus">
          <div class="container" id="box1">
            <div class="row mb-3">
              <div class="col-lg-6 col-md-6 col-12 my-2">
                <img
                  src="https://img.freepik.com/free-vector/hotel-review-concept_23-2148148426.jpg?t=st=1717065238~exp=1717068838~hmac=35cfa3cbaca00d26ccd5c0a95f6a6280aef18cc5a19bb2269d01a4ef1331fb88&w=740"
                  alt="image"
                  class="img-fluid"
                />
              </div>
              <div class="col-lg-6 col-md-6 col-12 p-lg-5 p-2 my-5">
                <h1>CONTACT US</h1>
                <form>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your name"
                    required
                  />
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                  />
                  <textarea
                    name="text"
                    id=""
                    cols=""
                    rows="10"
                    class="form-control"
                    placeholder="Enter your message"
                  ></textarea>
                  <button class="btn signin">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* <!--  Footer Section --> */}
        <footer class="bg-dark  bg-opacity-2 text-white py-2">
          <div class="container">
            <div class="flex-center flex-column">
              <p class="text-center form-control-lg ">
                &copy; Copyright 2024 - Prasanth Baskaran
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;

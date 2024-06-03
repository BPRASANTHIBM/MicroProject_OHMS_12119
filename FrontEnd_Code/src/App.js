import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useEffect } from "react";
import Home from "./LandingPage/Home";
import AdminLogin from "./AdminComponents/AdminLogin";
import AdminHome from "./AdminComponents/AdminNav/AdminHome";
import AddNewRoom from "./AdminComponents/AddNewRoom";
import GenerateBill from "./AdminComponents/GenerateBill";
import UserLogin from "./UserComponents/UserLogin";
import SignUp from "./UserComponents/SignUp";
import UserNav from "./UserComponents/UserNav";
import SearchRoom from "./UserComponents/SearchRoom";
import BookingHeader from "./AdminComponents/BookingHeader";
import ApplyRoom from "./UserComponents/ApplyRoom";
import UserBill from "./UserComponents/UserBill";

function App() {
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <div className="App">
        {loading ? (
          <div>
            <div>
              <div className="d-flex justify-content-center align-items-center vh-100 bg-light shadow-lg">
                <ScaleLoader
                  color="green"
                  size={50}
                  height={60}
                  width={10}
                  speedMultiplier={1}
                  loading={loading}
                ></ScaleLoader>

                <h1 className="p-lg-5 fw-bolder">Loading...</h1>
              </div>
            </div>
          </div>
        ) : (
          // setLoading(false)
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/adminLogin" element={<AdminLogin />} />
              <Route path="/adminHome" element={<AdminHome />} />
              <Route path="/addNewRoom" element={<AddNewRoom />} />
              <Route path="/bookingList" element={<BookingHeader />} />
              <Route path="/generateBill" element={<GenerateBill />} />
              <Route path="/userLogin" element={<UserLogin />} />
              <Route path="/userSignUp" element={<SignUp />} />
              <Route path="/userNav" element={<UserNav />} />
              <Route path="/userSearch" element={<SearchRoom />} />
              <Route path="/applyRoom/:roomId" element={<ApplyRoom />} />
              <Route path="/viewBill" element={<UserBill />} />

              <Route
                path="*"
                element={
                  <img
                    src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif"
                    style={{
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    alt="404 Error"
                  ></img>
                }
              />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </div>
  );
}

export default App;

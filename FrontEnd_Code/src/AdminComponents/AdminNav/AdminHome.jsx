import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./AdminNavbar.css";
import Header from "../SideNavbar/Header";
import AdminService from "../Service/AdminService";

function AdminHome() {
  const [roomCount, setRoomCount] = useState();
  const [pendingCount, setPendingCount] = useState();
  const [userCount, setUserCount] = useState();
  const [getBookings, setBookings] = useState([]);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    AdminService.roomCount().then((res) => {
      setRoomCount(res.data);
    });
    AdminService.pendingCount().then((res) => {
      setPendingCount(res.data);
    });
    AdminService.userStayCount().then((res) => {
      setUserCount(res.data);
    });

    AdminService.getBookings().then((res) => {
      setBookings(res.data);
    });
  }, []);

  return (
    <>
      <div>
        <Header />
        <main className="main-container my-5 mx-5 h-100 ">
          <div className="main-title d-flex justify-content-center text-dark fw-bolder">
            <h3>DASHBOARD</h3>
          </div>

          <div className="main-cards">
            <div className="card ms-5">
              <div className="card-inner">
                <h3>Room</h3>
                <BsFillArchiveFill className="card_icon" />
              </div>
              <h1>{roomCount}</h1>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3>Bookings</h3>
                <BsFillGrid3X3GapFill className="card_icon" />
              </div>
              <h1>{getBookings.length}</h1>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3>Resident User</h3>
                <BsPeopleFill className="card_icon" />
              </div>
              <h1>{userCount}</h1>
            </div>
            <div className="card">
              <div className="card-inner">
                <h3>Pending Request</h3>
                <BsFillBellFill className="card_icon" />
              </div>
              <h1>{pendingCount}</h1>
            </div>
          </div>
          <h2 className="fw-10 text-dark d-flex justify-content-center mt-5">
            Booking Graph
          </h2>
          <div className="charts">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={getBookings}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="bookingDate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookingId" fill="#8884d8" />
                <Bar dataKey="roomId.roomId" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={getBookings}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bookingDate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bookingId"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="roomId.roomId"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminHome;

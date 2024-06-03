import React from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import AdminService from "./Service/AdminService";
import Header from "./SideNavbar/Header";

const GenerateBill = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const [show, setShow] = useState(false);

  const handleVClose = () => setShow(false);

  const handleShow = (id) => {};

  useEffect(() => {
    loadData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = (userId, roomId, bedId) => {
    AdminService.generateBill(userId, roomId, bedId).then((res) => {
      console.log(res);
      setTimeout(() => {
        window.location.href = "/generateBill";
      }, 1000);
    });
  };

  const loadData = async () => {
    AdminService.getAllbed()
      .then((res) => {
        console.log(res.data);
        setRecords(res.data);
        return res.data;
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Header />
      <div>
        <div id="HostelList" className="container-fluid">
          <div className="card mt-5 bg-light">
            <div className="card-title mt-5 d-flex justify-content-center text-bg-dark">
              <h2>Generate Bill List</h2>
            </div>
            <div className="card-body">
              <div className="table table-bordered  table-striped w-100 border  shadow px-5 pb-5 rounded">
                <thead>
                  <tr>
                    <th className="bg-dark text-white w-25">BED ID</th>
                    <th className="bg-dark text-white w-25">USER NAME</th>
                    <th className="bg-dark text-white w-25">ROOM ID</th>
                    <th className="bg-dark text-white w-25">STATUS</th>

                    <th colSpan={1} className="bg-dark text-white w-50">
                      <center>ACTIONS</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((d, i) => (
                    <tr key={i}>
                      <td>{d.bedId}</td>
                      <td>
                        {d.userId !== null ? d.userId.username : "Not Assigned"}
                      </td>
                      <td>
                        {d.roomId !== null ? d.roomId.roomId : "Not Assigned"}
                      </td>
                      <td>{d.status}</td>
                      {d.status === "pending" ? (
                        <>
                          <td>
                            <Button
                              variant="contained"
                              color="success"
                              className="btn btn-success  me-2"
                              onClick={() => {
                                handleApprove(
                                  d.userId.id,
                                  d.roomId.roomId,
                                  d.bedId
                                );
                              }}
                            >
                              Generate Bill
                            </Button>
                          </td>
                        </>
                      ) : (
                        <>
                          {" "}
                          <td>
                            <Button
                              color="success"
                              variant="contained"
                              disabled
                            >
                              Generate Bill
                            </Button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateBill;

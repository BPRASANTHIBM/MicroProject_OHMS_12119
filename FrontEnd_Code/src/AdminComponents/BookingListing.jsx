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
import Swal from "sweetalert2";

const BookingListing = () => {
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

  const handleApprove = (userId, roomId, bookingId) => {
    AdminService.updateBooking(userId, roomId, bookingId).then((res) => {
      console.log(res);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Approved successfully !",
      });
      setTimeout(() => {
        window.location.href = "/bookingList";
      }, 1000);
    });
  };

  const handleReject = (bookingId) => {
    AdminService.deleteBooking(bookingId).then((res) => {
      console.log(res);
      setTimeout(() => {
        window.location.href = "/bookingList";
      }, 1000);
    });
  };

  const loadData = async () => {
    AdminService.getBookings()
      .then((res) => {
        console.log(res.data);
        setRecords(res.data);
        return res.data;
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <div>
        <div id="HostelList" className="container-fluid">
          <div className="card mt-5 bg-light">
            <div className="card-title mt-5 d-flex justify-content-center text-bg-dark">
              <h2>Room Booking List</h2>
            </div>
            <div className="card-body">
              <div className="table table-bordered  table-striped w-100 border  shadow px-5 pb-5 rounded">
                <thead>
                  <tr>
                    <th className="bg-dark text-white w-25">BOOKING ID</th>
                    <th className="bg-dark text-white w-25">BOOKING DATE</th>
                    <th className="bg-dark text-white w-25">USER NAME</th>
                    <th className="bg-dark text-white w-25">ROOM ID</th>
                    <th className="bg-dark text-white w-25">DOCUMENT</th>
                    <th className="bg-dark text-white w-25">TYPE</th>
                    <th className="bg-dark text-white w-25">STATUS</th>

                    <th colSpan={2} className="bg-dark text-white w-50">
                      <center>ACTIONS</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((d, i) => (
                    <tr key={i}>
                      <td>{d.bookingId}</td>
                      <td>{d.bookingDate}</td>
                      <td>
                        {d.userId !== null ? d.userId.username : "Not Assigned"}
                      </td>
                      <td>
                        {d.roomId !== null ? d.roomId.roomId : "Not Assigned"}
                      </td>
                      <td>
                        <Button
                          variant="outlined"
                          color="success"
                          className="btn btn-success"
                          onClick={() => {
                            Swal.fire({
                              title: "User Id Proof Document",
                              imageUrl: `data:image/jpeg;base64,${d.idProof}`,
                              imageAlt: "The User Id Proof picture",
                            });
                          }}
                        >
                          User Document
                        </Button>
                      </td>
                      <td>{d.idType}</td>
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
                                  d.bookingId
                                );
                              }}
                            >
                              Approve
                            </Button>
                          </td>
                          <td>
                            <div>
                              <React.Fragment>
                                <Button
                                  variant="contained"
                                  color="error"
                                  onClick={handleClickOpen}
                                >
                                  Reject
                                </Button>
                                <Dialog
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                >
                                  <DialogTitle id="alert-dialog-title">
                                    {"Are you sure to Reject this record?"}
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                      Once you Reject the Record You Can't
                                      recover again, make sure before
                                      proceeding!
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      color="success"
                                      variant="contained"
                                      onClick={handleClose}
                                    >
                                      Disagree
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      type="submit"
                                      onClick={(e) => {
                                        handleReject(d.bookingId);
                                      }}
                                      autoFocus
                                    >
                                      Agree
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </React.Fragment>
                            </div>
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
                              Approve
                            </Button>
                          </td>
                          <td>
                            <Button color="error" variant="contained" disabled>
                              Reject
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

export default BookingListing;

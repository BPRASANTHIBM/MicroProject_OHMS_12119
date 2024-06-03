import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import UserService from "./UserService/UserService";
import UserNav from "./UserNav";
import Avatar from "@mui/material/Avatar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function UserBill() {
  const [billdata, setBillData] = useState({
    userId: {},
  });

  const win = window.sessionStorage;

  const id = win.getItem("userId");

  useEffect(() => {
    UserService.getUserBill(id)
      .then((res) => {
        console.log(res.data);
        setBillData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleDownloadPDF = () => {
    const input = document.getElementById("billGen");
    // Specify the id of the element you want to convert to PDF
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("Hostel_Bill.pdf");
      // Specify the name of the downloaded PDF file
    });
  };

  return (
    <>
      <UserNav />
      <div>
        {billdata !== null && billdata.userId.id > 0 ? (
          <MDBContainer className="py-5" id="billGen">
            <MDBCard className="p-4 bg-light">
              <MDBCardBody>
                <MDBContainer className="mb-2 mt-3">
                  <MDBRow className="d-flex align-items-baseline">
                    <MDBCol xl="9">
                      <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                        Invoice &gt; &gt;{" "}
                        <strong>ID: #123-{billdata.billId}</strong>
                      </p>
                    </MDBCol>
                    <MDBCol xl="3" className="float-end">
                      <button
                        color="light"
                        ripple="dark"
                        className="text-capitalize border-0 btn btn-warning"
                      >
                        <MDBIcon
                          fas
                          icon="print"
                          color="primary"
                          className="me-1"
                        />
                        Print
                      </button>
                      <button
                        color="light"
                        ripple="dark"
                        className="text-capitalize border-0 ms-2 btn btn-warning"
                        onClick={handleDownloadPDF}
                      >
                        <MDBIcon
                          far
                          icon="file-pdf"
                          color="danger"
                          className="me-1"
                        />
                        <a download="Hostel_Bill">Export</a>
                      </button>
                      <hr />
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
                <MDBContainer>
                  <MDBCol md="12" className="text-center text-dark">
                    <center>
                      <Avatar
                        alt="Hostels"
                        sx={{
                          width: 50,
                          height: 50,
                        }}
                        src="https://www.tmu.ac.in/img/tmu/products/hostel.png"
                      />
                    </center>
                    <p>City Hostels</p>
                    <p className="pt-0">cityhostels.com</p>
                  </MDBCol>
                </MDBContainer>
                <MDBRow>
                  <MDBCol xl="8">
                    <MDBTypography listUnStyled>
                      <li className="text-muted">
                        To:{" "}
                        <span style={{ color: "#5d9fc5" }}>
                          {billdata.userId.username}
                        </span>
                      </li>
                      <li className="text-muted">
                        Email :{billdata.userId.email}
                      </li>

                      <li className="text-muted">
                        <MDBIcon fas icon="phone-alt" /> {billdata.userId.phone}
                      </li>
                    </MDBTypography>
                  </MDBCol>
                  <MDBCol xl="4">
                    <p className="text-muted">Invoice</p>
                    <MDBTypography listUnStyled>
                      <li className="text-muted">
                        <MDBIcon
                          fas
                          icon="circle"
                          style={{ color: "#84B0CA" }}
                        />
                        {/* <span className="fw-bold ms-1">ID:</span>#123-
                            {billdata.billId} */}
                      </li>
                      <li className="text-muted">
                        <MDBIcon
                          fas
                          icon="circle"
                          style={{ color: "#84B0CA" }}
                        />
                        <span className="fw-bold ms-1">Creation Date: </span>
                        {billdata.date}
                      </li>
                      <li className="text-muted">
                        <MDBIcon
                          fas
                          icon="circle"
                          style={{ color: "#84B0CA" }}
                        />
                        <span className="fw-bold ms-1">Status:</span>
                        <span className="badge bg-warning text-black fw-bold ms-1">
                          Unpaid
                        </span>
                      </li>
                    </MDBTypography>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="my-2 mx-1 justify-content-center">
                  <MDBTable striped borderless>
                    <MDBTableHead
                      className="text-white"
                      style={{ backgroundColor: "#84B0CA" }}
                    >
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Description</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Total Days</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <th scope="row">1</th>
                        <td>PG Room & Mess Bill</td>
                        <td>1</td>
                        <td>30 Days</td>
                        <td>Rs {billdata.total}</td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>
                </MDBRow>
                <MDBRow>
                  <MDBCol xl="8">
                    <p className="ms-3 text-dark">Additional payments</p>
                  </MDBCol>
                  <MDBCol xl="3">
                    <MDBTypography listUnStyled>
                      <li className="text-muted ms-3">
                        <span class="text-black me-4">SubTotal</span>Rs{" "}
                        {billdata.total}.00
                      </li>
                      {/* <li className="text-muted ms-3 mt-2">
                      <span class="text-black me-4">Tax(15%)</span>$111
                    </li> */}
                    </MDBTypography>
                    <p className="text-black float-start">
                      <span className="text-black me-3"> Total Amount</span>
                      <span style={{ fontSize: "25px" }}>
                        Rs {billdata.total}.00
                      </span>
                    </p>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol xl="10">
                    <p className="text-dark">Thank you for your Response</p>
                  </MDBCol>
                  {/* <MDBCol xl="2">
                  <MDBBtn
                    className="text-capitalize"
                    style={{ backgroundColor: "#60bdf3" }}
                  >
                    Pay Now
                  </MDBBtn>
                </MDBCol> */}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        ) : (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <h3>Your Bill is Not Generated !</h3>
          </div>
        )}
      </div>
    </>
  );
}

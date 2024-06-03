import axios from "axios";
import { Component } from "react";

const admin_signin = "http://localhost:8013/api/admin/signin";
const room_count = "http://localhost:8013/api/admin/roomCount";
const userstay_count = "http://localhost:8013/api/admin/userStayCount";
const pending_count = "http://localhost:8013/api/admin/pendingCount";
const addNewRoom = "http://localhost:8013/api/admin/addRoom?adminId=";
const getAllBooking = "http://localhost:8013/api/admin/getAllBooking";
const updateBooking = "http://localhost:8013/api/admin/updateBooking";
const deleteBooking =
  "http://localhost:8013/api/admin/deleteBooking?bookingId=";

const getAllbed = "http://localhost:8013/api/admin/getAllBed";
const generateBill = "http://localhost:8013/api/admin/generateBill/";

export class AdminService extends Component {
  adminSignIn(data) {
    return axios.post(admin_signin, data);
  }

  roomCount() {
    return axios.get(room_count);
  }

  userStayCount() {
    return axios.get(userstay_count);
  }

  pendingCount() {
    return axios.get(pending_count);
  }

  addNewRoomDetails(id, data) {
    return axios.post(addNewRoom + id, data);
  }

  getBookings() {
    return axios.get(getAllBooking);
  }

  updateBooking(userId, roomId, bookingId) {
    return axios.put(
      updateBooking + "/" + userId + "/" + roomId + "/" + bookingId
    );
  }
  deleteBooking(bookingId) {
    return axios.delete(deleteBooking + bookingId);
  }
  getAllbed() {
    return axios.get(getAllbed);
  }

  generateBill(userId, roomId, bedId) {
    return axios.put(generateBill + userId + "/" + roomId + "/" + bedId);
  }
}

export default new AdminService();

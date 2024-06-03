import axios from "axios";
import { Component } from "react";

const user_signin = "http://localhost:8013/api/user/signin";
const user_signup = "http://localhost:8013/api/user/signup";
const getAllRooms = "http://localhost:8013/api/user/getAllRooms";
const applyBooking = "http://localhost:8013/api/user/booking";
const getUserBill = "http://localhost:8013/api/user/getBill?userId=";
const vacateRoom = "http://localhost:8013/api/user/vacateRoom?userId=";
const verifyStatus = "http://localhost:8013/api/user/verifyStatus?userId=";

export class UserService extends Component {
  userSignIn(data) {
    return axios.post(user_signin, data);
  }
  userSignUp(data) {
    return axios.post(user_signup, data);
  }

  getAllRooms() {
    return axios.get(getAllRooms);
  }
  applyBooking(booking, userId, data, roomId) {
    return axios.post(
      applyBooking +
        "?userId= " +
        userId +
        "&roomId=" +
        roomId +
        "&booking=" +
        booking,
      data
    );
  }

  getUserBill(userId) {
    return axios.get(getUserBill + userId);
  }

  vacateRoom(userId) {
    return axios.delete(vacateRoom + userId);
  }

  verifyStatus(userId) {
    return axios.get(verifyStatus + userId);
  }
}

export default new UserService();

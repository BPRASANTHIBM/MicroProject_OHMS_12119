import React from "react";
import Header from "./SideNavbar/Header";
import BookingListing from "./BookingListing";

const BookingHeader = () => {
  return (
    <div>
      <Header />
      <BookingListing />
    </div>
  );
};

export default BookingHeader;

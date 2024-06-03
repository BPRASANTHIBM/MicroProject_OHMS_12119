import React from "react";
import { MainCaroselData } from "./MainCaroselData";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";


const MainCarosel = () => {
  const items = MainCaroselData.map((item) => (
    <img
      className="cursor-pointer border rounded "
      role="presentation"
      src={item.image}
      style={{
        width: "100%",
        height: "500px",
      }}
      alt=""
    />
  ));

  return (
    <div>
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
      />
    </div>
  );
};

export default MainCarosel;

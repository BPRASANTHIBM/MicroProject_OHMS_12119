import { useState } from "react";
import * as React from "react";
import "./SearchRoom.css";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import UserService from "./UserService/UserService";
import UserNav from "./UserNav";
import { useEffect } from "react";
import HotelTwoToneIcon from "@mui/icons-material/HotelTwoTone";
const win = window.sessionStorage;

const SearchRoom = () => {
  const [rooms, setRooms] = useState([]);

  const [value, setValue] = useState("");

  useEffect(() => {
    UserService.getAllRooms()
      .then((res) => {
        setRooms(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const filteredResults = rooms.filter((room) => {
    return room.roomType.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <div>
      <UserNav />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <Typography gutterBottom variant="h4" component="div">
              <HotelTwoToneIcon sx={{ fontSize: 50 }} /> Rooms
            </Typography>
            <input
              type="text"
              className="form-control-lg w-50 focus-ring-warning"
              placeholder="Search Rooms Based On Room Type..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <br />
            <br />
            <Grid container spacing={2}>
              {filteredResults.map((room) => (
                <Grid item key={room.roomId} xs={12} sm={6} md={3}>
                  <Card raised className="productImg">
                    <CardMedia
                      style={{
                        marginTop: "10%",
                        marginLeft: "3%",
                      }}
                      component="img"
                      height="150"
                      image={
                        room.roomSharing === 1
                          ? "https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/center_caption_photo/photo/5d634a742b71e9691acd2876/5.jpg"
                          : room.roomSharing === 2
                          ? "https://www.kcchostels.com/blog/wp-content/uploads/2021/09/1597990748phpWaV2VL.jpeg"
                          : "https://th.bing.com/th/id/OIP.bjnowCqVDIfvae8EbQeBYwHaFj?rs=1&pid=ImgDetMain"
                      }
                      alt={room.roomType}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body2"
                        fontSize={23}
                        fontWeight={700}
                        component="div"
                      >
                        Room : {room.roomId}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontSize={20}
                        fontWeight={700}
                        color="black"
                      >
                        Room Type : {room.roomType} with{" "}
                        {room.roomSharing === 1
                          ? "Single Bed"
                          : room.roomSharing === 2
                          ? "Double Bed"
                          : "Three Bed"}
                      </Typography>

                      <Typography
                        variant="body2"
                        fontSize={18}
                        marginBottom={1}
                        fontWeight={700}
                        color="black"
                      >
                        Present Members : {room.memCount}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="green"
                        fontSize={18}
                        fontWeight={700}
                        marginBottom={1}
                      >
                        Description :
                        {room.roomSharing === 1
                          ? "Private single occupancy PG room with essential amenities and a conducive environment for focused study or relaxation."
                          : room.roomSharing === 2
                          ? "Cozy double occupancy PG room with modern amenities, ideal for roommates or friends, centrally located for convenience."
                          : "Spacious triple sharing PG room fostering a sociable atmosphere, equipped with essential amenities for young professionals."}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontSize={23}
                        fontWeight={700}
                        color="blue"
                      >
                        {room.roomStatus === "Available" ? (
                          <Button
                            variant="contained"
                            fullWidth={100}
                            color="info"
                            size="medium"
                          >
                            Status : {room.roomStatus}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            fullWidth={100}
                            color="error"
                            size="medium"
                          >
                            Status : {room.roomStatus}
                          </Button>
                        )}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {room.roomStatus === "Available" ? (
                        <>
                          <Button
                            size="medium"
                            variant="contained"
                            color="success"
                            onClick={() => {
                              window.location.href = `/applyRoom/${room.roomId}`;
                            }}
                          >
                            Apply Room
                          </Button>
                        </>
                      ) : (
                        <>
                          {" "}
                          <Button
                            size="medium"
                            variant="contained"
                            color="success"
                            disabled
                          >
                            Apply Room
                          </Button>
                        </>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default SearchRoom;

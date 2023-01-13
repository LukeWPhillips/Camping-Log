import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { FaShower, FaDog } from "react-icons/fa";
import { GiCampfire } from "react-icons/gi";
import { Rating } from "@mui/material";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";

function Campsite() {
  const { listing, isLoggedIn, user } = useContext(UserContext);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "ddb09rtfy",
    },
  });

  const myImage = cld.image(listing.images.public_id);

  const navigate = useNavigate();

  //dev mode: http://localhost:5000

  const onClick = async () => {
    if (isLoggedIn === true && user._id === listing.id) {
      try {
        const res = await axios.delete(
          `/api/users/campsites/${listing._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(res);
        toast.info("Deleted!");
        navigate("/profile");
      } catch (error) {
        console.log("not deleted");
      }
    } else {
      toast.error("Not authorised to delete this entry!");
      toast.info("Only the author can delete");
    }
  };

  const onEdit = () => {
    if (user._id === listing.id) {
      navigate("/edit");
    } else {
      toast.info("Only the author can edit this campsite");
    }
  };

  return (
    <>
      <main className="main-campsite">
        <Navbar className="camp-nav" />
        <div className="campsite-img">
          <AdvancedImage cldImg={myImage} alt="" className="img" />
        </div>
        <div className="listingDetails">
          <p className="listingName">{listing.name}</p>
          <p className="listingLocation">{listing.location}</p>

          <div className="listingRating">
            <Rating
              id="rating"
              value={listing.rating}
              readOnly
              name={listing.name}
              size="medium"
              fontSize="inherit"
            />
          </div>
          <div className="icon-container">
            {listing.showers === true ? (
              <FaShower style={{ marginLeft: "10px" }} />
            ) : null}
            {listing.fires === true ? (
              <GiCampfire style={{ marginLeft: "10px" }} />
            ) : null}
            {listing.dogs === true ? (
              <FaDog style={{ marginLeft: "10px" }} />
            ) : null}
          </div>

          <div className="notes-container">{listing.notes}</div>
        </div>

        <button className="delete" onClick={onClick}>
          <AiFillDelete />
        </button>

        <button className="edit" onClick={onEdit}>
          <AiFillEdit />
        </button>
      </main>
    </>
  );
}

export default Campsite;

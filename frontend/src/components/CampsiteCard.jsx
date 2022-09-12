import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { FaShower, FaDog } from "react-icons/fa";
import { GiCampfire } from "react-icons/gi";
import { Rating } from "@mui/material";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

import UserContext from "../context/UserContext";

function CampsiteCard({ campsite }) {
  // const { images } = useContext(UserContext);

  const { setListing } = useContext(UserContext);

  const onClick = (e) => {
    setListing(campsite);
    navigate("/campsites");
  };

  const navigate = useNavigate();

  const cld = new Cloudinary({
    cloud: {
      cloudName: "ddb09rtfy",
    },
  });

  const myImage = cld.image(campsite.images.public_id);

  return (
    <>
      <AdvancedImage
        cldImg={myImage}
        alt=""
        id="campsiteImg"
        onClick={onClick}
      />

      <div className="campsiteDetails" onClick={onClick}>
        <p className="campsiteLocation">{campsite.location}</p>
        <p className="campsiteName">{campsite.name}</p>
        <div className="campsiteRating">
          Rating:
          <Rating
            id="rating"
            value={campsite.rating}
            readOnly
            name={campsite.name}
            size="small"
            fontSize="inherit"
          />
        </div>
        <div className="icons">
          {campsite.showers === true ? (
            <FaShower style={{ marginLeft: "10px" }} />
          ) : null}
          {campsite.fires === true ? (
            <GiCampfire style={{ marginLeft: "10px" }} />
          ) : null}
          {campsite.dogs === true ? (
            <FaDog style={{ marginLeft: "10px" }} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default CampsiteCard;

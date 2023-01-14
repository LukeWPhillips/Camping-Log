import { toast } from "react-toastify";

import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Navbar from "../components/Navbar";
import { Rating } from "@mui/material";

import axios from "axios";

function NewCampsite() {
  const [campsite, setCampsite] = useState({
    name: "",
    location: "",
    notes: "",
    showers: false,
    images: "",
    dogs: false,
    fires: false,
  });

  const { name, location, notes, showers, images, dogs, fires } = campsite;

  const { user } = useContext(UserContext);
  // eslint-disable-next-line
  const [id, setId] = useState(user._id);
  // eslint-disable-next-line
  const [token, setToken] = useState(user.token);
  const [rating, setRating] = useState(0);

  const onChange = (e) => {
    let boolean = null;
    if (boolean === true) {
      boolean = "true";
    }
    if (boolean === false) {
      boolean = "false";
    }

    // text/booleans/numbers
    if (!e.target.files) {
      setCampsite((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const handleImages = async (e) => {
    const file = e.target.files[0];
    const base64 = await setFileToBase(file);
    setCampsite({ ...campsite, images: base64 });
  };

  const setFileToBase = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = axios.post(`/api/users/campsites`, {
        id: id,
        name: name,
        location: location,
        notes: notes,
        showers: showers,
        rating: rating,
        images: images,
        dogs: dogs,
        fires: fires,

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Campsite created!");
      console.log(res.data);
    } catch (error) {
      toast.error(" failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="">
        <section className="header">
          <h1 className="create-h1"> Add A New Campsite</h1>
        </section>

        <form onSubmit={submitHandler} encType="multipart/form-data">
          {/* <label htmlFor="email">Customer Email</label>
          <input type="email" className="form-control" value={email} disabled /> */}

          <label className="formLabel">Name</label>
          <input
            className="create-input"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Campsite name"
            required
          />
          <label className="formLabel">Location</label>
          <input
            className="create-input"
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={onChange}
            placeholder="Campsite location"
            required
          />
          <label className="formLabel">Notes</label>
          <textarea
            className="create-input-notes"
            type="text"
            name="notes"
            id="notes"
            value={notes}
            onChange={onChange}
            required
          />
          <label className="formLabel">Review</label>
          <div className="App">
            <Rating
              name="simple-controlled"
              value={rating}
              style={{ marginLeft: "30px" }}
              size="large"
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
          <label className="formLabel">Images</label>
          <p className="imagesInfo">
            The first image will be the cover (max 6).
          </p>
          <input
            className="formInputFile"
            type="file"
            id="images"
            onChange={handleImages}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple={true}
            required
          />

          <div className="formButtons">
            <label className="formLabel">Showers</label>
            <button
              className="formButton"
              type="button"
              id="showers"
              value={true}
              onClick={onChange}
            >
              Yes
            </button>
            <button
              className="formButton"
              type="button"
              id="showers"
              value={false}
              onClick={onChange}
            >
              No
            </button>

            <label className="formLabel">Fires Allowed</label>
            <button
              className=" formButton"
              type="button"
              id="fires"
              value={true}
              onClick={onChange}
            >
              Yes
            </button>
            <button
              className="formButton"
              type="button"
              id="fires"
              value={false}
              onClick={onChange}
            >
              No
            </button>
            <label className="formLabel">Dogs Allowed</label>
            <button
              className="formButton"
              type="button"
              id="dogs"
              value={true}
              onClick={onChange}
            >
              Yes
            </button>
            <button
              className="formButton"
              type="button"
              id="dogs"
              value={false}
              onClick={onChange}
            >
              No
            </button>
          </div>

          <div className="btn-container">
            <button className="primary-button">Create</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewCampsite;

import React from "react";
import { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Rating } from "@mui/material";

import { toast } from "react-toastify";

import axios from "axios";
import UserContext from "../context/UserContext";

function Edit() {
  const [campsite, setCampsite] = useState({
    name: "",
    location: "",
    notes: "",
    showers: "",
    images: "",
    dogs: "",
    fires: "",
  });
  const [rating, setRating] = useState(0);

  const { listing } = useContext(UserContext);

  const { name, location, notes, showers, images, dogs, fires } = campsite;

  useEffect(() => {
    setCampsite(listing);
  }, [listing]);

  const onChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = "true";
    }
    if (e.target.value === "false") {
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

    //dev mode: http://localhost:5000

    try {
      const res = await axios.put(
        `/api/users/campsites/${listing._id}`,
        {
          name: name,
          location: location,
          notes: notes,
          showers: showers,
          rating: rating,
          images: images,
          dogs: dogs,
          fires: fires,

          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      toast.success("Campsite updated!");
      console.log(res.data);
    } catch (error) {
      if (error === 401) {
        toast.errror("You cannot update this campground");
      }
      if (error === 404) {
        toast.errror("cant find this site");
      }
      toast.error(" failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="">
        <section className="header">
          <h1 className="create-h1"> Edit Campsite</h1>
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
              required
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
            multiple
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
              required
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
              className=" formButton"
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
            <button className="primary-button">Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Edit;

import React from "react";
import Navbar from "../components/Navbar";
import CampsiteCard from "../components/CampsiteCard";
import { useNavigate } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";

import axios from "axios";

function Profile() {
  const { setIsLoggedIn, isLoggedIn, setUser, user, campsites, setCampsites } =
    useContext(UserContext);

  // eslint-disable-next-line
  const [error, setError] = useState();

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setIsLoggedIn(true);
    }

    setLoading(true);
    const getData = async (token) => {
      try {
        const res = await axios.get(`/users/campsites`);

        await setCampsites({ data: res.data });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.response.data);
      }
    };
    getData();
  }, [setCampsites, setIsLoggedIn, setUser]);

  const onAdd = () => {
    if (isLoggedIn === false) {
      toast.info("You must be logged in to create a campsite");
      navigate("/profile");
    } else {
      navigate("api/newcampsite");
    }
  };

  return (
    <>
      <Navbar />

      <section className="header">
        {isLoggedIn === false ? (
          <h1 className="create-h1"> Campsites </h1>
        ) : (
          <h1 className="create-h1"> {user.name}'s Campsites </h1>
        )}
      </section>

      <div className="campsite-container">
        <Grid container id="grid-item" spacing={2}>
          {loading ? (
            <div className="loader">
              <CircularProgress size="3rem" thickness={5} />
            </div>
          ) : (
            campsites?.data?.map((campsite) => (
              <Grid
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                key={campsite.id}
                xs={12}
                sm={6}
                md={6}
                lg={3}
              >
                <CampsiteCard id="grid-item" campsite={campsite} />
              </Grid>
            ))
          )}
        </Grid>
      </div>

      <button className="add" onClick={onAdd}>
        <GrAdd />
      </button>
    </>
  );
}

export default Profile;

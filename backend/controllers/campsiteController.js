const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Campsite = require("../models/campsiteModel");
const cloudinary = require("../utils/cloudinary");

//  GET user campsites
//  /api/users/campsites
// access: private

const getCampsites = asyncHandler(async (req, res) => {
  const campsites = await Campsite.find({});

  res.status(200).json(campsites);
});
//  GET user single campsite
//  GET   /api/users/campsites/:id
// access: private

const getCampsite = asyncHandler(async (req, res) => {
  // get user using id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const campsite = await Campsite.findById(req.params.id);

  if (!campsite) {
    res.status(404);
    throw new Error("ticket not found");
  }

  if (campsite.user.toString() !== req.user.id) {
    res.sendStatus(401);
    throw new Error("Not authroised");
  }

  res.status(200).json(campsite);
});

//  Create campsites
//  POST /api/create
// access: private

const createCampsite = asyncHandler(async (req, res) => {
  const { id, images, name, location, rating, notes, dogs, showers, fires } =
    req.body;

  if (!name || !location) {
    res.status(400);
    throw new Error("Please add a all fields");
  }

  const result = await cloudinary.uploader.upload(images, {
    folder: "campsites",
    // width: 300,
    // crop: "scale",
  });
  const campsite = await Campsite.create({
    id,
    name,
    location,
    rating,
    notes,
    images: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    dogs,
    fires,
    showers,

    status: "new",
  });

  res.status(201).json(campsite);
});

// Delete a campsite
// DELETE /api/users/campsites/:id
// access: private

const deleteCampsite = asyncHandler(async (req, res) => {
  // get user using id and jwt

  const campsite = await Campsite.findById(req.params.id);

  if (!campsite) {
    res.status(404);
    throw new Error("campsite not found");
  }

  await campsite.remove();

  res.status(200).json({ success: true });
});
// update a campsite
// PUT /api/users/campsites/:id
// access: private

const updateCampsite = asyncHandler(async (req, res) => {
  const campsite = await Campsite.findById(req.params.id);

  if (!campsite) {
    res.status(404);
    throw new Error("campsite not found");
  }

  const updatedCampsite = await Campsite.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCampsite);
});

module.exports = {
  getCampsites,
  createCampsite,
  getCampsite,
  deleteCampsite,
  updateCampsite,
};

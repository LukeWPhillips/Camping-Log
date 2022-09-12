const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createCampsite,
  getCampsites,
  getCampsite,
  deleteCampsite,
  updateCampsite,
} = require("../controllers/campsiteController");

router.route("/").get(getCampsites).post(createCampsite);

router
  .route("/:id")
  .get(getCampsite)
  .get(getCampsites)
  .delete(deleteCampsite)
  .put(updateCampsite);

module.exports = router;

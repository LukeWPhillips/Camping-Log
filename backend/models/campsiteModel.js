const mongoose = require("mongoose");

const campsiteSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    images: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    location: {
      type: String,
    },
    rating: {
      type: String,
      rating: Number,
    },
    notes: {
      type: String,
    },
    showers: {
      type: Boolean,
    },
    fires: {
      type: Boolean,
    },
    dogs: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Campsite", campsiteSchema);

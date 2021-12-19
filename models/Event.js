const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    organizations: { type: Array },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", EventSchema);
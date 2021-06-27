const mongoose = require("mongoose");

const BookmarkSchema = mongoose.Schema({
  user: String,
  bookmark: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("bookmark", BookmarkSchema);


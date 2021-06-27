const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema({
  user: String,
  playlist: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("playlist", PlaylistSchema);


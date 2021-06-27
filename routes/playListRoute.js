const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist");
const verify = require("./verifyToken");

//Get user's playlist
router.get("/", verify, async (req, res) => {
  try {
    const playlists = await Playlist.findOne({ user: req.user._id });
    res.json(playlists);
  } catch (err) {
    res.json({ message: err });
  }
});


//add new user's playlist
router.post("/", verify, async (req, res) => {
  try {
    const savedPlaylist = await Playlist.findOneAndUpdate(
      { user: req.user._id },
      { playlist: req.body.playlist },
      null,
      async function (err, result) {
        if (!result) {
          const playlist = new Playlist({
            user: req.user._id,
            playlist: req.body.playlist,
          });
          try {
            const savedPlaylist = await playlist.save();
            res.json(savedPlaylist);
          } catch (err) {
            res.status(400).json({ message: err });
          }
        }
      }
    );
    res.send(savedPlaylist);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;

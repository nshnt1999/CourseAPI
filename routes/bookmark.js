const express = require("express");
const router = express.Router();
const Bookmark = require("../models/Bookmark");
const verify = require("./verifyToken");

//Get user's bookmark
router.get("/", verify, async (req, res) => {
  try {
    const bookmarks = await Bookmark.findOne({ user: req.user._id });
    res.json(bookmarks);
  } catch (err) {
    res.json({ message: err });
  }
});

//add new user's bookmark
router.post("/", verify, async (req, res) => {
  try {
    const savedBookmark = await Bookmark.findOneAndUpdate(
      { user: req.user._id },
      { bookmark: req.body.bookmark },
      null,
      async function (err, result) {
        if (!result) {
          const bookmark = new Bookmark({
            user: req.user._id,
            bookmark: req.body.bookmark,
          });
          try {
            const savedBookmark = await bookmark.save();
            res.json(savedBookmark);
          } catch (err) {
            res.status(400).json({ message: err });
          }
        }
      }
    );
    res.send(savedBookmark);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;

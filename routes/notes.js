const express = require("express");
const router = express.Router();
const Notes = require("../models/Note");
const verify = require("./verifyToken");

//Get user's notes
router.get("/", verify, async (req, res) => {
  try {
    const notes = await Notes.findOne({ user: req.user._id });
    res.json(notes);
  } catch (err) {
    res.json({ message: err });
  }
});

//add new user's notes
router.post("/", verify, async (req, res) => {
  try {
    const savedNotes = await Notes.findOneAndUpdate(
      { user: req.user._id },
      { notes: req.body.notes },
      null,
      async function (err, result) {
        if (!result) {
          const notes = new Notes({
            user: req.user._id,
            notes: req.body.notes,
          });
          try {
            const savedNotes = await notes.save();
            res.json(savedNotes);
          } catch (err) {
            res.status(400).json({ message: err });
          }
        }
      }
    );
    res.send(savedNotes);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;

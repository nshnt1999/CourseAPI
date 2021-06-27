const express = require("express");
const router = express.Router();
const History = require("../models/History");
const verify = require("./verifyToken");

//Get user's history
router.get("/", verify, async (req, res) => {
  try {
    const history = await History.findOne({ user: req.user._id });
    res.json(history);
  } catch (err) {
    res.json({ message: err });
  }
});

//add new user's history
router.post("/", verify, async (req, res) => {
  try {
    const savedHistory = await History.findOneAndUpdate(
      { user: req.user._id },
      { history: req.body.history },
      null,
      async function (err, result) {
        if (!result) {
          const history = new History({
            user: req.user._id,
            history: req.body.history,
          });
          try {
            const savedHistory = await history.save();
            res.json(savedHistory);
          } catch (err) {
            res.status(400).json({ message: err });
          }
        }
      }
    );
    res.send(savedHistory);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;

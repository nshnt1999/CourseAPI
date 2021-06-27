const mongoose = require("mongoose");

const HistorySchema = mongoose.Schema({
  user: String,
  history: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("history", HistorySchema);

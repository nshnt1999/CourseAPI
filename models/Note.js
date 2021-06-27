const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  user:String,
  notes:[]
});

module.exports = mongoose.model('note', NoteSchema);


const mongoose = require('mongoose');

const settingSchema = mongoose.Schema({
  courseName: {type: String, required: true},
  courseValue: {type: String, required: true},
  fee: {type: Number, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", require:true}
});


module.exports = mongoose.model('Settings', settingSchema);

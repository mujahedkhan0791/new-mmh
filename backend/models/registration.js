
const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
  name: {type: String, required: true},
  fatherName: {type: String, required: false},
  imagePath: {type: String, required: false},
  address: {type: String, required: false},
  dob: {type: Date, required: false},
  education: {type: String, required: false},
  previousKnowledge: {type: String, required: false},
  phone: {type: Number, required: false},
  courseApplied: {type: String, required: false},
  certificateIssued: {type: Boolean, required: false},
  certificateNumber: {type: Number, required: false},
  comment: {type: String, required: false},
  referBy: {type: String, required: false},
  doa: {type: Date, required: false},
  signP: {type: String, required: false},
  signS: {type: String, required: false},
  regNo: {type: String, required: false},
  courseName: {type: String, required: false},
  totalFee: {type: Number, required: false},
  studentID: {type: Number, required: true, unique: true},
  doP: {type: Date, required: false},
  signCo: {type: String, required: false},

  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", require:true}
});

module.exports = mongoose.model('Registration', registrationSchema);

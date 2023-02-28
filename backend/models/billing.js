
const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
  studentID: {type: Number, required: true},
  totalFee: {type: Number, required: true},
  dueAmount: {type: Number, required: true},
  amountPaid: {type: Number, required: true},
  paymentDate: {type: Date, required: true},
  recivedBy: {type: String, required: true},
  billNo: {type: Number, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", require:true}
});


module.exports = mongoose.model('Bill', billSchema);

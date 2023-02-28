const express = require("express");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const BillingController = require("../controllers/billing")


  router.post("",checkAuth, BillingController.createBill);
  router.delete("/:id",checkAuth, BillingController.deleteBill);
  router.get('/:studentID', BillingController.getBillByID);
  router.get('', BillingController.getBills);


  module.exports = router;

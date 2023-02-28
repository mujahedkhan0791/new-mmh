const Billing = require('../models/billing');

exports.createBill = async (req, res, next)=> {
  let posts = new Billing({
    studentID: req.body.studentID,
    totalFee: req.body.totalFee,
    dueAmount: req.body.dueAmount,
    amountPaid: req.body.amountPaid,
    paymentDate: req.body.paymentDate,
    recivedBy: req.body.recivedBy,
    billNo: req.body.billNo,
    creator: req.userData.userId
  });

  posts = await posts.save();
  res.status(201).json({
    message: "Registration addedd successfully",
  })
  }

  exports.getBillByID = (req, res, next) => {
    const postQuery = Billing. find({studentID:req.params.studentID});

    postQuery.then(documents => {
      res.status(200).json({
        bills: documents
      });
    })
    }

    exports.getBills = (req, res, next) => {
      const postQuery = Billing. find().sort({billNo:-1});

      postQuery.then(documents => {
        res.status(200).json({
          bills: documents
        });
      })
      }

  exports.deleteBill = async (req, res, next)=> {
    Billing.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
      if(result.deletedCount >0){ //nModified
        res.status(200).json({
          message: "Updated Successful!"
        })
      }else {
        res.status(401).json({
          message: "Updated Successful!"
        })
      }
    });
  }

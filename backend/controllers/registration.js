const Registration = require('../models/registration');

exports.CreateRegistarion =  async (req, res, next)=> {
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
    console.log('inside File');
  }
  const url = req.protocol + '://' + req.get("host");
  console.log('path',req.body);
  console.log('postimagePath',imagePath);
  let posts = new Registration({
    name: req.body.name,
    fatherName: req.body.fatherName,
    imagePath: imagePath,
    address: req.body.address,
    dob: req.body.dob,
    education: req.body.education,
    previousKnowledge: req.body.previousKnowledge,
    phone: req.body.phone,
    courseApplied: req.body.courseApplied,
    certificateIssued: req.body.certificateIssued,
    certificateNumber: req.body.certificateNumber,
    comment: req.body.comment,
    referBy: req.body.referBy,
    doa: req.body.doa,
    signP: req.body.signP,
    signS: req.body.signS,
    regNo: req.body.regNo,
    courseName: req.body.courseName,
    totalFee: req.body.totalFee,
    studentID: req.body.studentID,
    doP: req.body.doP,
    signCo: req.body.signCo,
    creator: req.userData.userId
  });

  posts = await posts.save();
  res.status(201).json({
    message: "Registration addedd successfully",
  })
  }

  exports.deleteRegistration = async (req, res, next)=> {
    Registration.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
      console.log(result);
      if(result.deletedCount >0){ //nModified
        res.status(200).json({
          message: "Updated Successful!"
        })
      }else {
        res.status(401).json({
          message: "Updated Successful!"
        })
      }
      // res.status(200).json({message: "Deleted!"})
    });
  }

  exports.getStudentsDetails = (req, res, next) => {
    // const pageSize = +req.query.pagesize;
    // const currentPage = req.query. page;
    const postQuery = Registration. find();
    // if (pageSize && currentPage) {
    //   postQuery
    //   .skip(pageSize * (currentPage - 1))
    //   .limit (pageSize);
    // }
    postQuery.then(documents => {
      // console.log('testingMD',documents);
      res.status(200).json({
        message: "post message successfully",
        post: documents
      });
    })
    }

    exports.updateStudentDetails = (req, res, next) => {
      let imagePath = req.body.imagePath;
      if(req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
        // console.log('inside File');
      }
      // console.log('resput', req.body);
      // console.log('imagePath', imagePath);
      const post = { _id: req.body.id,
        name: req.body.name,
        fatherName: req.body.fatherName,
        imagePath: imagePath,
        address: req.body.address,
        dob: req.body.dob,
        education: req.body.education,
        previousKnowledge: req.body.previousKnowledge,
        phone: req.body.phone,
        courseApplied: req.body.courseApplied,
        certificateIssued: req.body.certificateIssued,
        certificateNumber: req.body.certificateNumber,
        comment: req.body.comment,
         referBy: req.body.referBy,
        doa: req.body.doa,
        signP: req.body.signP,
        signS: req.body.signS,
        regNo: req.body.regNo,
        courseName: req.body.courseName,
        totalFee: req.body.totalFee,
        studentID: req.body.studentID,
        doP: req.body.doP,
        signCo: req.body.signCo,
        creator: req.userData.userId};
        // console.log('req.userData.userId',req.userData);
      Registration.updateOne({_id: req.body.id, creator: req.userData.userId}, post).then(result => {
        // console.log('put',result);
        // console.log(result);
        if(result.matchedCount >0 || result.modifiedCount >0){ //nModified  changed to modifiedCount
          res.status(200).json({
            message: "Updated Successful!"
          })
        }else {
          res.status(401).json({
            message: "Not Authorized!"
          })
        }
        // res.status(200).json({message: 'Updated Successfu l!'});
      });
      }

const Settings = require('../models/settings');



exports.createCourse = async (req, res, next)=> {
  let posts = new Settings({
    courseName: req.body.courseName,
    courseValue: req.body.courseValue,
    fee: req.body.fee,
    creator: req.userData.userId
  });

  posts = await posts.save();
  res.status(201).json({
    message: "Settings addedd successfully",
  })
  }

  exports.deleteCourse = async (req, res, next)=> {
    Settings.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
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

  exports.getCourses = (req, res, next) => {
    const postQuery = Settings. find();

    postQuery.then(documents => {
      res.status(200).json({
        courses: documents
      });
    })
    }

    exports.updateCourse = (req, res, next) => {

      const post = { _id: req.body.id,
        courseName: req.body.courseName,
        courseValue: req.body.courseValue,
        fee: req.body.fee,
        creator: req.userData.userId};
      Settings.updateOne({_id: req.body.id, creator: req.userData.userId}, post).then(result => {

        if(result.matchedCount >0 || result.modifiedCount >0){ //nModified  changed to modifiedCount
          res.status(200).json({
            message: "Updated Successful!"
          })
        }else {
          res.status(401).json({
            message: "Not Authorized!"
          })
        }
      });
      }

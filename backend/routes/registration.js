const express = require("express");
const multer = require('multer');

const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const RegistrationController = require("../controllers/registration");

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('invalid image type');
      if (isValid) {
          uploadError = null;
      }
      cb(uploadError, 'backend/images');
  },
  filename: function (req, file, cb) {
      const filename = `${file.originalname.split(' ').join('-')}`;
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${filename}-${Date.now()}.${extension}`);
  }
});


// multer({storage:storage}).single("image"),
  router.post("",checkAuth,multer({storage:storage}).single("imagePath"),RegistrationController.CreateRegistarion);
  router.delete("/:id",checkAuth, RegistrationController.deleteRegistration);
  router.get('',RegistrationController.getStudentsDetails);
  router.put('/:id',checkAuth,multer({storage:storage}).single("imagePath"),RegistrationController.updateStudentDetails);

  // router.use((req, res, next) => {
  // console.log("My meddle ware");
  // next();
  // });


  module.exports = router;

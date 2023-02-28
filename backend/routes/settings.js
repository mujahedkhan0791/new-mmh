const express = require("express");

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const SettingsController = require("../controllers/settings");

router.post("",checkAuth, SettingsController.createCourse);

  router.delete("/:id",checkAuth, SettingsController.deleteCourse);

  router.get('',SettingsController.getCourses);

  router.put('/:id',checkAuth, SettingsController.updateCourse);

  module.exports = router;

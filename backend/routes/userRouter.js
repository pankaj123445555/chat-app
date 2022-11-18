const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const {
  registerUser,
  authUser,
  allUser,
} = require("../controller/userController");

router.route("/").post(registerUser).get(protect, allUser);

router.route("/login").post(authUser);

module.exports = router;

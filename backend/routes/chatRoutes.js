const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { accessChat } = require("../controller/chatController");
const { fetchChat } = require("../controller/chatController");
const { createGroupChat } = require("../controller/chatController");
const { renameGroup } = require("../controller/chatController");
const { addtoGroup } = require("../controller/chatController");
const { removeFromGroup } = require("../controller/chatController");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/addGroup").put(protect, addtoGroup);
router.route("/groupremove").put(protect, removeFromGroup);

module.exports = router;

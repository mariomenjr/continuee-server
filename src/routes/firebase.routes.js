const express = require("express");
const router = express.Router();

const firebaseController = require("../../controllers/firebase.controller");

router.route("/share").get(firebaseController.share);

module.exports = router;

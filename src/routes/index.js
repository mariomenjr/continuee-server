const express = require("express");
const router = express.Router();

const firebaseRouter = require("./firebase.routes");

router.use("/firebase", firebaseRouter)

module.exports = router;
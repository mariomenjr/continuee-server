const express = require("express");
const router = express.Router();

const packageJson = require("../../package.json");
const firebaseRouter = require("./firebase.routes");

router.use(`/firebase`, firebaseRouter);
router.use(`/`, (_, res) =>
  res.send(`${packageJson.name}/${packageJson.version} @ ${new Date()}`)
);

module.exports = router;

const express = require("express");
const firebase = require("firebase-admin");
const app = express();

const { initializeFirebase } = require("./src/firebase/firebaseAdmin");
initializeFirebase();

const PORT = process.env.PORT || 3010;

app.get("/", async function (req, res) {
  try {
    const resp = await firebase.messaging().send({}); // TODO: Get token from client
    return res.send({ url: req.url, resp });
  } catch (error) {
    console.error(`[error] ${error}`)
    return res.status(500).send(error);
  }
});

app.listen(PORT, () =>
  console.info(`[info] Listening at http://localhost:${PORT}`)
);

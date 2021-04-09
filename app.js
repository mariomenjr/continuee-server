const express = require("express");
const app = express();

const firebaseAdmin = require("./src/firebase/firebaseAdmin");
firebaseAdmin.initializeFirebase();

const PORT = process.env.PORT || 3010;
const routes = require("./src/routes");

app.use(`/`, routes);

app.listen(PORT, () =>
  console.info(`[info] Listening at http://localhost:${PORT}`)
);

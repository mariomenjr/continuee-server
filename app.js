require("dotenv").config();

const express = require("express");
const db = require("./db/connector");

const app = express();

const firebaseAdmin = require("./src/firebase/firebaseAdmin");
firebaseAdmin.initializeFirebase();

const PORT = process.env.PORT || 3010;
const routes = require("./src/routes");

app.use(`/`, routes);

db.connect()
  .then(async (r) =>
    app.listen(PORT, () =>
      console.info(`[info] Listening at http://localhost:${PORT}`)
    )
  )
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

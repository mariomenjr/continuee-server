require("dotenv").config();

import express from "express";

import db from "./src/db/connector";

import routes from "./src/routes";
import firebaseAdmin from "./src/firebase/firebaseAdmin";
import passport from "./src/middlewares/auth.middleware";

const app = express();
const PORT = process.env.PORT || 3010;

firebaseAdmin.initialize();

// Parse application/json
app.use(express.json());

// All routes
app.use(`/`, passport.authenticate(`jwt`, { session: false }), routes);

// TODO: Handle errors globally

db.connect()
  .then(async () =>
    app.listen(PORT, () =>
      console.info(`[server]: Server is running at http://localhost:${PORT}`)
    )
  )
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  });

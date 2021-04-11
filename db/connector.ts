import { connect as _connect } from "mongoose";

import Chain from "./models/Chain";

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_DB,
  MONGO_AUTH_MECHANISM,
} = process.env;

function connect() {
  return _connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authMechanism: MONGO_AUTH_MECHANISM || `SCRAM-SHA-1`,
    }
  );
}

export default { connect, models: { Chain } };

const mongoose = require("mongoose");

const ChainModel = require("./models/Chain");

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_DB,
  MONGO_AUTH_MECHANISM,
} = process.env;

function connect() {
  return mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authMechanism: MONGO_AUTH_MECHANISM || `SCRAM-SHA-1`,
    }
  );
}

module.exports = { connect, models: { ChainModel } };

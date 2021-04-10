const mongoose = require("mongoose");

const chainSchema = new mongoose.Schema(
  {
    chainGuid: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    token: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chain = mongoose.models.Chain || mongoose.model(`Chain`, chainSchema);

module.exports = Chain;

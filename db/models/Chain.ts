import { Schema, models, model } from "mongoose";

const chainSchema = new Schema(
  {
    chainGuid: {
      type: Schema.Types.String,
      required: true,
    },
    token: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chain = models.Chain || model(`Chain`, chainSchema);

export default Chain;

import { Chain } from "./Chain";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

const LoginSchema = new Schema<LoginDocument, LoginModel>(
  {
    token: {
      type: Schema.Types.String,
      required: true,
    },
    platformName: {
      type: Schema.Types.String,
      required: true,
    },
    platformVer: {
      type: Schema.Types.String,
      required: true,
    },
    chain: {
      type: Schema.Types.ObjectId,
      ref: `Chain`,
      required: true,
    },
  },
  { timestamps: true }
);

export interface Login {
  token: string;
  platformName: string;
  platformVer: string;
  chain: Types.ObjectId | Chain;
}

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the related
 * entities' fields are not deterministic
 *
 * See: Types, references, virtuals and instance methods
 * https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
 */
interface LoginDocument extends Login, Document {} // LoginBaseDocument

// export interface LoginDocument extends LoginBaseDocument {}

export interface LoginModel extends Model<LoginDocument> {}

export default mongoose.models.Login ||
  mongoose.model<LoginDocument, LoginModel>(`Login`, LoginSchema);

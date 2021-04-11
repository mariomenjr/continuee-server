import { Chain } from "./Chain";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

const DeviceSchema = new Schema<DeviceDocument, DeviceModel>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    ver: {
      type: Schema.Types.String,
      required: true,
    },
    uid: {
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
      ref: `Company`,
      required: true,
    },
  },
  { timestamps: true }
);

export interface Device {
  name: string;
  ver: string;
  uid: string;
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
interface DeviceDocument extends Device, Document {} // DeviceBaseDocument

// export interface DeviceDocument extends DeviceBaseDocument {}

export interface DeviceModel extends Model<DeviceDocument> {}

export default mongoose.models.Device ||
  mongoose.model<DeviceDocument, DeviceModel>(`Device`, DeviceSchema);

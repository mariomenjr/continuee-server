import mongoose, { Schema, Document, Model } from "mongoose";

const ChainSchema = new Schema<ChainDocument, ChainModel>(
  {
    token: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

export interface Chain {
  token: string;
}

/**
 * Not directly exported because it is not recommanded to
 * use this interface direct unless necessary since the related
 * entities' fields are not deterministic
 *
 * See: Types, references, virtuals and instance methods
 * https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
 */
interface ChainDocument extends Chain, Document {} // ChainBaseDocument

// export interface ChainDocument extends ChainBaseDocument {}

export interface ChainModel extends Model<ChainDocument> {}

export default mongoose.models.Chain ||
  mongoose.model<ChainDocument, ChainModel>(`Chain`, ChainSchema);

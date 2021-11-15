import mongoose, { Schema, Document, Model } from "mongoose";

const ChainSchema = new Schema<ChainDocument, ChainModel>(
  {
    token: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

export interface Chain {
  token: string;
  name: string;
}

/**
 * Not directly exported because it is not recommanded to
 * use this interface directly. Because the related
 * entities' fields are not deterministic.
 *
 * See: Types, references, virtuals and instance methods
 * https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
 */
interface ChainDocument extends Chain, Document {} // ChainBaseDocument

// export interface ChainDocument extends ChainBaseDocument {}

export interface ChainModel extends Model<ChainDocument> {
  findByToken(token: string): Promise<ChainDocument | null>;
}

ChainSchema.statics.findByToken = async function (
  this: Model<ChainDocument>,
  token: string
): Promise<ChainDocument | null> {
  return await this.findOne({ token }).exec();
};

export default mongoose.model<ChainDocument, ChainModel>(`Chain`, ChainSchema);

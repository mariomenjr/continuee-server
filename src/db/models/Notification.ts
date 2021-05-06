import { messaging } from "firebase-admin";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

import { Device } from "./Device";

const FirebaseResultSchema = new Schema({
  messageId: {
    type: Schema.Types.String,
    required: true,
  },
});

const FirebaseReponseSchema = new Schema({
  canonicalRegistrationTokenCount: {
    type: Schema.Types.Number,
    required: true,
  },
  failureCount: {
    type: Schema.Types.Number,
    required: true,
  },
  multicasId: {
    type: Schema.Types.Number,
    required: true,
  },
  successCount: {
    type: Schema.Types.Number,
    required: true,
  },
  results: [FirebaseResultSchema],
});

const NotificationSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    recipients: [
      {
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
    firebaseResponse: FirebaseReponseSchema,
  },
  { timestamps: true }
);

export interface Notification {
  sender: Types.ObjectId | Device;
  recipients: Types.ObjectId[] | Device[];
  firebaseResponse: messaging.MessagingDevicesResponse
}

interface NotificationDocument extends Notification, Document {} // NotificationBaseDocument

export interface NotificationModel extends Model<NotificationDocument> {}

export default mongoose.models.Notification ||
  mongoose.model<NotificationDocument, NotificationModel>(`Notification`, NotificationSchema);
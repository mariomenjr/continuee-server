import firebase, { messaging } from "firebase-admin";
import { Request, Response } from "express";

const templater = require("json-templater/object");

import linkSharedTemplate from "../../templates/linkShared.json";

import DeviceMongo from "../db/models/Device";

export async function share(req: Request, res: Response) {
  try {
    const body: any = req.body;

    const fromDevice = await DeviceMongo.findByUid(body.devices.fromUid);
    const toDevice = await DeviceMongo.findByUid(body.devices.toUid);

    const payload = templater(linkSharedTemplate, {
      sender: fromDevice?.platform?.name ?? ``,
      origin: toDevice?.platform?.name ?? ``,
      what: `YouTube video`, // Find out given the URL
      link: body.shareLink,
    });

    const resp: messaging.MessagingDevicesResponse = await firebase
      .messaging()
      .sendToDevice(body.registrationToken, payload);

    return res.send(resp);
  } catch (error) {
    console.error(`[error] ${error}`);
    return res.status(500).send(error);
  }
}
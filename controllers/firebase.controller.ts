import { Request, Response } from "express";
import firebase from "firebase-admin";

const templater = require("json-templater/object");

import linkSharedTemplate from "../templates/linkShared.json";

export async function share(req: Request, res: Response) {
  try {
    const query: any = req.query;

    const payload = templater(linkSharedTemplate, {
      sender: `Mario`,
      origin: `OnePlus 8`,
      what: `YouTube video`,
      link: query.sharedLink,
    });

    const resp = await firebase
      .messaging()
      .sendToDevice(query.registrationToken, payload);

    return res.send(resp);
  } catch (error) {
    console.error(`[error] ${error}`);
    return res.status(500).send(error);
  }
}

// OnePlus 8
// cI8zqkYeRMaUTDmVC93Dlk:APA91bFoUYDptKR7tqG9mXDRx514-6eovvTgUKL6L8F26ISsBiKH6lQc4RlKSWoKEUIOQSAsf1_LWES4hw3u-bvPFdoDOWX_HJXYbNsPW2P4jJfxvpxvkD8dhh6ZqqTEiVvMLAalTTZK

// Virtual phone
// eTpHtrUCSxO9JV1JHuJZka:APA91bHLICywKfi_gnKUc9AAR7h9r7vuCOShNBgGPzu8kSIWRhhYtYnQIVKb_HYrl1UgRpCziz36jUV-tEv94rDWUu0LphZDyy-ovtgkeXXu1Xxe9kQF_eBeMghZDje2RPemAiVfZxB5

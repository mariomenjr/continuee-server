
const firebase = require("firebase-admin");
const templater = require("json-templater/object");

const linkSharedTemplate = require("../templates/linkShared.json");

async function share(req, res) {
  try {
    const {
      registrationToken,
      sharedLink
    } = req.query;

    console.debug({ registrationToken, sharedLink });

    const payload = templater(linkSharedTemplate, {
      sender: `Mario`,
      origin: `OnePlus 8`,
      what: `YouTube video`,
      link: sharedLink,
    });

    const resp = await firebase.messaging().sendToDevice(registrationToken, payload);
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

module.exports = { share };

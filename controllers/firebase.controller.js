
const firebase = require("firebase-admin");
const templater = require("json-templater/object");

const linkSharedTemplate = require("../templates/linkShared.json");

async function share(req, res) {
  try {
    const payload = templater(linkSharedTemplate, {
      sender: `Mario`,
      origin: `OnePlus 8`,
      what: `YouTube video`,
      link: `https://mariomenjr.com/blog/`,
    });

    const resp = await firebase.messaging().sendToDevice(req.query.registrationToken, payload);
    return res.send(resp);
  } catch (error) {
    console.error(`[error] ${error}`);
    return res.status(500).send(error);
  }
}

module.exports = { share };

const firebase = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

module.exports = {
  initializeFirebase() {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
    });
    console.info(`[info] Firebase App initialized`);
  }
}
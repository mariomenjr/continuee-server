import { initializeApp, credential as _credential } from "firebase-admin";

import serviceAccount from "./serviceAccountKey.json";

export function initialize() {
  initializeApp({
    credential: _credential.cert(<any>serviceAccount),
  });
  console.info(`[firebase]: Firebase App initialized`);
}

export default { initialize };
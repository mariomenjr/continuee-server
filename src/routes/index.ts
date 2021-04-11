import express, { Response, Request } from "express";

const router = express.Router();

import packageJson from "../../package.json";
import firebaseRouter from "./firebase.routes";

router.use(`/firebase`, firebaseRouter);
router.use(`/`, (_: Request, res: Response) =>
  res.send(`${packageJson.name}/${packageJson.version} @ ${new Date()}`)
);

export default router;

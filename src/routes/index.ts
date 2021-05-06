import express, { Response, Request } from "express";

const router = express.Router();

import packageJson from "../../package.json";
import firebaseRouter from "./firebase.routes";
import deviceRouter from "./device.routes";
import chainRouter from "./chain.routes";

router.use(`/firebase`, firebaseRouter);
router.use(`/device`, deviceRouter);
router.use(`/chain`, chainRouter);

router.use(`/`, (_: Request, res: Response) =>
  res.send(`${packageJson.name}/${packageJson.version} @ ${new Date()}`)
);

export default router;

import { Router } from "express";
const router = Router();

import { identify } from "../controllers/device.controller";

router.route("/identify").post(identify);

export default router;

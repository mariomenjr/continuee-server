import { Router } from "express";
const router = Router();

import { generateSync, createChain, join } from "../controllers/chain.controller";

router.route("/generateSync").get(generateSync);
router.route("/createChain").post(createChain);
router.route("/join").put(join);

export default router;
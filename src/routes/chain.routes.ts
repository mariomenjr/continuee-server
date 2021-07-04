import { Router } from "express";
const router = Router();

import { createSync, createChain, join } from "../controllers/chain.controller";

router.route("/createSync").post(createSync);
router.route("/createChain").post(createChain);
router.route("/join").put(join);

export default router;
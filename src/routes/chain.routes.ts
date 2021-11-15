import { Router } from "express";
const router = Router();

import { generateSync, createChain, joinChain } from "../controllers/chain.controller";

router.route("/generateSync").get(generateSync);
router.route("/createChain").post(createChain);
router.route("/joinChain").put(joinChain);

export default router;
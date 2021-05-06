import { Router } from "express";
const router = Router();

import { create, join } from "../controllers/chain.controller";

router.route("/create").post(create);
router.route("/join").put(join);

export default router;
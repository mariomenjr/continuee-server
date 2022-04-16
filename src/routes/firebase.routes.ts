import { Router } from "express";
const router = Router();

import { share } from "../controllers/firebase.controller";

router.route("/share").post(share);

export default router;

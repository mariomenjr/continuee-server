import { Router } from "express";
const router = Router();

import { share } from "../../controllers/firebase.controller";

router.route("/share").get(share);

export default router;

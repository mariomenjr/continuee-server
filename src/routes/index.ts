import express, { Response, Request, Router } from "express";
import authorize from "../middlewares/auth.middleware";

const router = express.Router();
const STRATEGY = process.env.IDENTITY_STRATEGY;

import packageJson from "../../package.json";

import firebaseRouter from "./firebase.routes";
import deviceRouter from "./device.routes";
import chainRouter from "./chain.routes";

// Protected routes
const protectedRoutes = [
  {
    endpoint: `/firebase`,
    endpointRouter: firebaseRouter,
  },
  {
    endpoint: `/device`,
    endpointRouter: deviceRouter,
  },
  {
    endpoint: `/chain`,
    endpointRouter: chainRouter,
  },
];

protectedRoutes.forEach(({ endpoint, endpointRouter }) =>
  router.use(
    endpoint,
    authorize,
    endpointRouter
  )
);

router.use(`/`, (_: Request, res: Response) =>
  res.send(
    [
      `${packageJson.name}/${packageJson.version} @ ${new Date()}`,
      `Repo: <a href="${packageJson.repository.url}">${packageJson.repository.url}</a>`,
    ].join(`<br />`)
  )
);

export default router;

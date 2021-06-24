import express, { Response, Request, Router } from "express";
import authorize from "../middlewares/auth.middleware";

const router = express.Router();

import packageJson from "../../package.json";

import firebaseRouter from "./firebase.routes";
import deviceRouter from "./device.routes";
import chainRouter from "./chain.routes";

const controllersRoutes = [
  {
    endpoint: `/firebase`,
    endpointRouter: firebaseRouter,
    allowAnonymous: true,
  },
  {
    endpoint: `/device`,
    endpointRouter: deviceRouter,
    allowAnonymous: true,
  },
  {
    endpoint: `/chain`,
    endpointRouter: chainRouter,
    allowAnonymous: true,
  },
];

controllersRoutes.forEach(({ endpoint, endpointRouter, allowAnonymous }) =>
  allowAnonymous
    ? router.use(endpoint, endpointRouter)
    : router.use(endpoint, authorize, endpointRouter)
);

router.use(`/`, (_: Request, res: Response) =>
  res.send(
    [
      `${new Date().toISOString()}/${process.env.NODE_ENV}`,
      ``,
      `${packageJson.name}@v${packageJson.version}`,
      `${packageJson.description}`,
      `<a href="${packageJson.repository.url}">${packageJson.repository.url}</a>`,
    ].join(`<br />`)
  )
);

export default router;

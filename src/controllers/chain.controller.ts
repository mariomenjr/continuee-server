import crypto from "crypto";

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { rword } from "rword";

import DeviceMongo, { Device } from "../db/models/Device";
import ChainMongo, { Chain } from "../db/models/Chain";

/**
 * Creates the Sync information for the user to confirm
 * 
 * @param req.body
 * @param res 
 * @returns Words and noise words
 */
export async function createSync(req: Request, res: Response) {
  try {
    const words = rword.generate(5);
    const noise = rword.generate(5);

    return res.json({ noise: [...words, ...noise].shuffle(), words });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * Creates a chain with at least one device
 * 
 * @param req.body You need at least one device to create a chain
 * @param res 
 * @returns Newly created chain
 */
export async function createChain(req: Request, res: Response) {
  try {
    const token = crypto
      .createHash(`sha256`)
      .update(JSON.stringify(req.body.words))
      .digest(`hex`);

    const chain = await ChainMongo.create({ token });
    const _ = await DeviceMongo.create({ ...req.body.device, chain });

    return res.json(chain);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export function join(req: Request, res: Response) {
  try {
    const body: Device = req.body;
    console.log({ body });
    return res.json(req.body);
  } catch (error) {
    console.error(`[error] ${error}`);
    return res.status(500).send(error);
  }
}
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
export async function generateSync(req: Request, res: Response) {
  const sync = (rword.generate(5) as string[]).join(` `);
  const name = `My Sync Chain`;

  return res.json({ sync, name });
}

/**
 * Creates a chain with at least one device
 * 
 * @param req.body You need at least one device to create a chain
 * @param res 
 * @returns Newly created chain
 */
export async function createChain(req: Request, res: Response) {
  const token = crypto
    .createHash(`sha256`)
    .update(JSON.stringify(req.body.sync))
    .digest(`hex`);

  const chain = await ChainMongo.create({ token });
  const _ = await DeviceMongo.create({ ...req.body.device, chain });

  return res.json(chain);
}

export function join(req: Request, res: Response) {
  const body: Device = req.body;
  
  return res.json(req.body);
}
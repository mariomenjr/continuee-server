import { Request, Response } from "express";
import { rword } from "rword";

import DeviceMongo, { Device } from "../db/models/Device";
import ChainMongo from "../db/models/Chain";
import { createHash } from "../utils/crypto.utils";

/**
 * Creates the Sync information for the user to confirm
 * 
 * @param req.body
 * @param res 
 * @returns Sync code and default chain name
 */
export async function generateSync(req: Request, res: Response) {
  const sync = (rword.generate(5) as string[]).join(` `);
  const name = `My Sync Chain`; // TODO: Take it to a confg file

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
  const token = createHash(req.body.sync);

  const chain = await ChainMongo.create({ token, name: req.body.name });
  await DeviceMongo.create({ ...req.body.device, chain });

  return res.json({ chainId: chain.id }); // TODO: Don't send Chain (it has the token)
}

export async function joinChain(req: Request, res: Response) {
  const { device, token }: { device: Device, token: string } = req.body;

  const foundChain = await ChainMongo.findByToken(createHash(token));
  if (!foundChain) return res.status(404).send(`Invalid sync code. Chain not found.`);

  const foundDevice = await DeviceMongo.findByUid(device.uid);
  if (!foundDevice) await DeviceMongo.create({ ...req.body.device, chain: foundChain });

  return res.json({ chainId: foundChain.id, chainName: foundChain.name, isNewDevice: !foundDevice });
}
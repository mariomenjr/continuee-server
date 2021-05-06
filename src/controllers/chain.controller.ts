import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import DeviceMongo, { Device } from "../db/models/Device";
import ChainMongo, { Chain } from "../db/models/Chain";

/**
 * Creates a chain with at least one device
 * 
 * @param req.body You need at least one device to create a chain
 * @param res 
 * @returns Newly created chain
 */
export async function create(req: Request, res: Response) {
  try {
    const chain = await ChainMongo.create({ token: uuidv4() });
    const device = await DeviceMongo.create({ ...req.body, chain });

    console.debug({ chain, device });

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
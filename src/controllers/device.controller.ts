import { Request, Response } from "express";

import DeviceMongo, { Device } from "../db/models/Device";

/**
 * Identify chain for a device
 * 
 * @param {Device} req.body A device to use for identification
 * @param res 
 * @respond {Chain} The identified chain
 */
export async function identify(req: Request, res: Response) {
  try {
    const device: Device = req.body;

    const foundDevice = await DeviceMongo.findByUidWithChain(device.uid);
    if (!foundDevice) return res.status(404); // TODO: Throw 404 programmatically

    return res.json(foundDevice.chain);
  } catch (error) {
    console.error(`[error] ${error}`);
    return res.status(500).send(error);
  }
}

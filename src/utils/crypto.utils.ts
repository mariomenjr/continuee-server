import crypto from "crypto";

export function createHash(s: string): string {
  return crypto
    .createHash(`sha256`)
    .update(s)
    .digest(`hex`);
}
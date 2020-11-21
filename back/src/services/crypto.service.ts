import NodeRSA from "node-rsa";

import { AppKey } from "../types/app.key.interface";

export function generateRsaKeyPair(): AppKey {
  const key = new NodeRSA();

  key.generateKeyPair(2048, 65537);

  const publicKey = key.exportKey("pkcs1-public-pem");
  const privateKey = key.exportKey("pkcs1-private-pem");

  return { publicKey, privateKey, generationDate: new Date().toISOString() };
}

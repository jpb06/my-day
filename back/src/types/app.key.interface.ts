import { ObjectId } from "bson";

export interface AppKey {
  _id?: ObjectId;
  publicKey: string;
  privateKey: string;
  generationDate: string;
}

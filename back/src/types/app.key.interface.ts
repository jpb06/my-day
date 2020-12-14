import { ObjectId } from "bson";

export interface AppKey {
  publicKey: string;
  privateKey: string;
  generationDate: string;
}

export interface PersistedAppKey extends AppKey {
  _id: ObjectId;
}

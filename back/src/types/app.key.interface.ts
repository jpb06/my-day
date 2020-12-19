import { ObjectId } from "../../../front/src/stack-shared-code/types/ObjectId";

export interface NewAppKey {
  _id?: ObjectId;
  publicKey: string;
  privateKey: string;
  generationDate: string;
}

export interface AppKey extends NewAppKey {
  _id: ObjectId;
}

// Not going to add the entire bson package just for a type, so there..

export class ObjectId {
  constructor(id?: string | number | ObjectId);
  generationTime: number;
  static cacheHexString?: boolean;
  static createFromHexString(hexString: string): ObjectId;
  static createFromTime(time: number): ObjectId;
  static isValid(id: string | number | ObjectId): boolean;
  equals(otherID: ObjectId | string): boolean;
  static generate(time?: number): Buffer;
  getTimestamp(): Date;
  toHexString(): string;
}

import { ObjectId } from "bson";

// type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
// type EnhancedOmit<T, K> = string | number extends keyof T ? T : Omit<T, K>;
// type ExtractIdType<TSchema> = TSchema extends { _id: infer U }
//   ? {} extends U
//     ? Exclude<U, {}>
//     : unknown extends U
//     ? ObjectId
//     : U
//   : ObjectId;
// type WithId<TSchema> = EnhancedOmit<TSchema, "_id"> & {
//   _id: ExtractIdType<TSchema>;
// };
// type OptionalId<TSchema extends { _id?: any }> = ObjectId extends TSchema["_id"]
//   ? EnhancedOmit<TSchema, "_id"> & { _id?: ExtractIdType<TSchema> }
//   : WithId<TSchema>;

import { ObjectId } from "bson";
import { MongoClient, OptionalId } from "mongodb";

import { DbConfig } from "../../../types/db.config.interface";
import { getDbConfig } from "./db.config";

const connect = async ({
  url,
  username,
  password,
}: DbConfig): Promise<MongoClient> => {
  const client = await MongoClient.connect(url, {
    auth: {
      user: username,
      password: password,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client;
};

export const create = async <T>(
  collectionName: string,
  value: OptionalId<T>
): Promise<ObjectId | undefined> => {
  const config = getDbConfig();
  const client = await connect(config);

  try {
    const db = client.db(config.database);
    const collection = db.collection<T>(collectionName);

    const result = await collection.insertOne(value);
    if (result.insertedCount === 1) return result.insertedId as ObjectId;
    else return undefined;
  } finally {
    await client.close();
  }
};

export const createOrUpdate = async <T>(
  collectionName: string,
  term: object,
  value: T
): Promise<T | undefined> => {
  const config = getDbConfig();
  const client = await connect(config);

  try {
    const db = client.db(config.database);
    const collection = db.collection<T>(collectionName);

    // nb : upsert either
    // + Creates a new document if no documents match the filter. Returns null after inserting the new document, unless returnNewDocument is true.
    // + Updates a single document that matches the filter.

    const result = await collection.findOneAndUpdate(
      term,
      { $set: value },
      { upsert: true, returnOriginal: false }
    );
    if (result.ok === 1) return result.value;
    else return undefined;
  } finally {
    await client.close();
  }
};

export const clearAndCreateMany = async <T>(
  collectionName: string,
  term: object,
  values: Array<OptionalId<T>>
): Promise<boolean> => {
  const config = getDbConfig();
  const client = await connect(config);

  try {
    const db = client.db(config.database);
    const collection = db.collection<T>(collectionName);

    const deleteResult = await collection.deleteMany(term);
    const insertResult = await collection.insertMany(values);

    if (deleteResult.result.ok === 1 && insertResult.result.ok === 1) {
      return true;
    } else {
      return false;
    }
  } finally {
    await client.close();
  }
};

export const clearAllAndCreateMany = async <T>(
  collectionName: string,
  values: Array<OptionalId<T>>
): Promise<boolean> => await clearAndCreateMany<T>(collectionName, {}, values);

export const getAll = async <T>(collectionName: string): Promise<Array<T>> => {
  const config = getDbConfig();
  const client = await connect(config);

  try {
    const db = client.db(config.database);
    const collection = db.collection<T>(collectionName);

    const result = await collection.find().toArray();

    return result;
  } finally {
    await client.close();
  }
};

export const getBy = async <T>(
  collectionName: string,
  term: object,
  sort: object,
  count?: number
): Promise<Array<T>> => {
  const config = getDbConfig();
  const client = await connect(config);

  try {
    const db = client.db(config.database);
    const collection = db.collection<T>(collectionName);

    let result = collection.find(term).sort(sort);

    if (count) result = result.limit(count);

    return await result.toArray();
  } finally {
    await client.close();
  }
};

export const remove = async <T>(
  collectionName: string,
  term: object
): Promise<boolean> => {
  const config = getDbConfig();
  const client = await connect(config);

  try {
    const db = client.db(config.database);
    const collection = db.collection<T>(collectionName);

    const result = await collection.deleteOne(term);

    return result.deletedCount === 1;
  } finally {
    await client.close();
  }
};

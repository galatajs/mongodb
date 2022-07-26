import { MongoClient } from "mongodb";

export type MongodbCollectionKey = {
  key: string;
  provider: string;
};

export type MongodbClientStore = {
  selectedCollectionKeys: MongodbCollectionKey[];
};

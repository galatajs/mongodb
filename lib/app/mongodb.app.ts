import { CorePluginCreator, ModuleRegisterer } from "@istanbul/app";
import { MongoClient, MongoClientOptions } from "mongodb";
import { MongodbCollectionKey } from "../types/mongodb.types";

export interface MongodbApp extends CorePluginCreator {
  client?: MongoClient;
}

export interface MongodbOptions extends MongoClientOptions {
  url: string;
  database?: string;
}

export type MongodbAppCreator = (options: MongodbOptions) => MongodbApp;

export type MongodbCollectionRegisterer = (
  key: string | MongodbCollectionKey,
  clientNumber?: number
) => ModuleRegisterer;

import { App, ModuleRegisterer, warn } from "@istanbul/app";
import { MongoClient } from "mongodb";
import {
  MongodbApp,
  MongodbAppCreator,
  MongodbCollectionRegisterer,
  MongodbOptions,
} from "../app/mongodb.app";
import {
  MongodbClientStore,
  MongodbCollectionKey,
} from "../types/mongodb.types";

const clientStore: Map<number, MongodbClientStore> = new Map();

const makeDefaultCollectionKey = (key: string): string => {
  return key + " Collection";
};

export const createMongodbApp: MongodbAppCreator = (
  options: MongodbOptions
): MongodbApp => {
  return {
    client: undefined,
    build() {
      return {
        name: "mongodb",
        version: "0.0.1",
        install: async (app: App) => {
          this.client = new MongoClient(options.url, options);
          await this.client.connect();
          if (clientStore.has(clientStore.size)) {
            const stored = clientStore.get(clientStore.size);
            for (const entity of stored!.selectedCollectionKeys) {
              const collection = this.client!.db(options.database).collection(
                entity.key
              );
              app.store.provide(entity.provider, collection);
            }
          }
        },
      };
    },
  };
};

export const registerCollection: MongodbCollectionRegisterer = (
  params: string | MongodbCollectionKey,
  clientNumber: number = 1
): ModuleRegisterer => {
  if (clientStore.has(clientNumber)) {
    const client = clientStore.get(clientNumber);
    if (typeof params === "string") {
      client!.selectedCollectionKeys.push({
        key: params,
        provider: makeDefaultCollectionKey(params),
      });
    } else {
      client!.selectedCollectionKeys.push({
        key: params.key,
        provider: params.provider,
      });
    }
  } else {
    warn(`Mongodb client with number ${clientNumber} is not found.`);
  }
  return {
    key:
      typeof params === "string"
        ? makeDefaultCollectionKey(params)
        : params.provider,
  };
};

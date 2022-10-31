import { App } from "@galatajs/app";
import { MongoClient, MongoClientOptions } from "mongodb";
import {
  MongodbApp,
  MongodbAppCreator,
  MongodbOptions,
} from "../app/mongodb.app";
import { MongodbClientStore } from "../types/mongodb.types";

export const clientStore: Map<number, MongodbClientStore> = new Map();

const transformOptionsToMongoOptions = (
  options: MongodbOptions
): MongoClientOptions => {
  return Object.assign({}, options, { url: undefined, database: undefined });
};

export const createMongodbApp: MongodbAppCreator = (
  options: MongodbOptions
): MongodbApp => {
  return {
    client: undefined,
    build() {
      const self = this;
      return {
        name: "mongodb",
        version: "0.0.1",
        install: async (app: App) => {
          this.client = new MongoClient(
            options.url,
            transformOptionsToMongoOptions(options)
          );
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
        close() {
          self.client!.close();
        },
      };
    },
  };
};

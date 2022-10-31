import { ModuleRegisterer } from "@galatajs/app";
import { MongodbCollectionRegisterer } from "../app/mongodb.app";
import { MongodbCollectionKey } from "../types/mongodb.types";
import { clientStore } from "./mongodb.hooks";

const makeDefaultCollectionKey = (key: string): string => {
  return key + " Collection";
};

const calculateCollectionKey = (
  params: string | MongodbCollectionKey
): MongodbCollectionKey => {
  if (typeof params === "string") {
    return {
      key: params,
      provider: makeDefaultCollectionKey(params),
    };
  }
  return params;
};

export const registerCollection: MongodbCollectionRegisterer = (
  params: string | MongodbCollectionKey,
  clientNumber: number = 1
): ModuleRegisterer => {
  const collectionKey = calculateCollectionKey(params);
  if (clientStore.has(clientNumber)) {
    const client = clientStore.get(clientNumber);
    client!.selectedCollectionKeys.push(collectionKey);
  } else {
    clientStore.set(clientNumber, {
      selectedCollectionKeys: [collectionKey],
    });
  }
  return {
    key:
      typeof params === "string"
        ? makeDefaultCollectionKey(params)
        : params.provider,
  };
};

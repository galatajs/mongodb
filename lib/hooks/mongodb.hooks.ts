import {
  MongodbApp,
  MongodbAppCreator,
  MongodbOptions,
} from "../app/mongodb.app";

export const createMongodbApp: MongodbAppCreator = (
  options: MongodbOptions
): MongodbApp => {
  return {
    build() {
      return {
        name: "mongodb",
        version: "0.0.1",
        install: () => {},
      };
    },
  };
};

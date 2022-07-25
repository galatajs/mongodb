import { CorePluginCreator } from "@istanbul/app";

export interface MongodbApp extends CorePluginCreator {}

export type MongodbOptions = {};

export type MongodbAppCreator = (options: MongodbOptions) => MongodbApp;

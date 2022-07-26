import { MongoClient, Collection } from "mongodb";
import { createApp, createModule } from "@istanbul/app";
import { createMongodbApp, registerCollection } from "../lib";

describe("Mongodb & Istanbul Integrated tests", () => {
  it("create a istanbul app and mongodb app, check connection is established", async () => {
    const app = createApp();
    const mongodbApp = createMongodbApp({
      url: "mongodb://localhost:27017",
    });
    app.register(mongodbApp);
    await app.start();
    expect(mongodbApp.client).toBeInstanceOf(MongoClient);
    expect(mongodbApp.build).toBeDefined();
  });

  it("create a istanbul app and register a collection to module", async () => {
    const moduleProvider = (params) => {
      expect(params.testCollection).toBeInstanceOf(Collection);
    };
    const testModule = createModule("test", {
      imports: [registerCollection("test")],
      providers: [moduleProvider],
    });

    const app = createApp(testModule);
    const mongodbApp = createMongodbApp({
      url: "mongodb://localhost:27017",
    });
    app.register(mongodbApp);
    await app.start();
  }, 10000);
});

import { createMongodbApp, registerCollection } from "../lib";

describe("Mongodb Unit tests", () => {
  it("check createMongodbApp is really returns MongodbApp", () => {
    const mongodbApp = createMongodbApp({
      url: "mongodb://localhost:27017",
      database: "test",
    });
    expect(mongodbApp.client).toBeUndefined();
    expect(mongodbApp.build).toBeDefined();
  });

  it("check registerCollection is really returns ModuleRegisterer", () => {
    const mongodbApp = createMongodbApp({
      url: "mongodb://localhost:27017",
      database: "test",
    });
    const moduleRegisterer = registerCollection("test");
    expect(moduleRegisterer.key).toBe("test Collection");
  });
});

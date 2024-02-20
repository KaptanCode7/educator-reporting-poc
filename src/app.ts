import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyMongo from "@fastify/mongodb";
import { CustomFastifyInstance } from "./interfaces";
const mongoDbPlugin = import("./plugins/mongodb.plugin");

// Function to build and configure the Fastify application instance
export const buildApp = function (): CustomFastifyInstance {
  // Create a new Fastify instance with logger enabled
  const fastifyApp: CustomFastifyInstance = fastify({ logger: true });

  // Register CORS plugin for handling Cross-Origin Resource Sharing
  fastifyApp.register(cors);

  // Register Fastify MongoDB plugin with configuration options
  fastifyApp.register(fastifyMongo, {
    // Force the MongoDB connection to close when the app is stopped
    forceClose: true,
    // MongoDB connection URL
    url: "mongodb://localhost:27017",
  });

  // An example of registering a custom Plugin
  // const registerMongoDbPlugin = async () => {
  //   const plugin = await mongoDbPlugin;
  //   fastifyApp.register(plugin.default);
  // };
  // registerMongoDbPlugin();

  // Register routes for the application by importing route modules
  // Add Prefixes to the route if required
  fastifyApp.register(
    import("./modules/assignment-student-group/assignment-student-group.routes")
  );

  // Use the onReady hook to execute code when the application is ready
  fastifyApp.addHook("onReady", async () => {
    // Decorate the FastifyApp instance with additional properties or methods
    // In this case, decorate with 'reportingDbInstance'
    // 'reportingDbInstance' is set to the MongoDB client's 'newReportingDB' database
    fastifyApp.decorate(
      "reportingDbInstance",
      fastifyApp.mongo.client.db("newReportingDB")
    );
  });

  // Return the configured Fastify application instance
  return fastifyApp;
};

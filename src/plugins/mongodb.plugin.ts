import fastifyMongo from "@fastify/mongodb";
import { CustomFastifyInstance } from "../interfaces";
import fastifyPlugin from "fastify-plugin";

async function mongoDbPlugin(fastifyApp: CustomFastifyInstance) {
  // Register Fastify MongoDB plugin with configuration options
  fastifyApp.register(fastifyMongo, {
    // Force the MongoDB connection to close when the app is stopped
    forceClose: true,
    // MongoDB connection URL
    url: "mongodb://localhost:27017", 
  });
}
// export const registerMongoDbPlugin = mongoDbPlugin;
export default fastifyPlugin(mongoDbPlugin);

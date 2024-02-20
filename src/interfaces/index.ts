import { FastifyInstance } from "fastify";
import { Db } from "mongodb";

// Define a custom type or interface for the Fastify application instance
// We are doing this because, we are attaching mongo's reportingDbInstance in app.ts using decorator
export interface CustomFastifyInstance extends FastifyInstance {
  // Add any other properties you need for the application
  reportingDbInstance?: Db;
}

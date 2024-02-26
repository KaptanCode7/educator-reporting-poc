import "reflect-metadata";
import fastify, { FastifyRegisterOptions } from "fastify";
import cors from "@fastify/cors";
import { CustomFastifyInstance } from "./interfaces";
import fastifyAutoload from "@fastify/autoload";
import { join } from "path";

import mercurius, { MercuriusOptions } from "mercurius";
import { buildSchema } from "type-graphql";
// import { sequenceResolver } from "./graphql/sequences/sequenceResolver";
import { SequenceResolverClass } from "./schemas/SequenceResolverClass";
import { GraphQLSchema } from "graphql";

// Function to build and configure the Fastify application instance
export const buildApp = async function (): Promise<CustomFastifyInstance> {
  // Create a new Fastify instance with logger enabled
  const fastifyApp: CustomFastifyInstance = fastify({ logger: true });

  // Register CORS plugin for handling Cross-Origin Resource Sharing
  fastifyApp.register(cors);

  // Autoload plugins from the specified directory
  fastifyApp.register(fastifyAutoload, {
    dir: join(__dirname, "plugins"),
  });

  // Autoload routes from the specified directories and register them
  fastifyApp.register(fastifyAutoload, {
    dir: join(__dirname, "modules"),
    maxDepth: 1,
    dirNameRoutePrefix: false,
    // load only .routes.js files.
    // we must mention ".js" because after compilation ts files are in js format
    matchFilter: (path) => path.endsWith("routes.js"),
    options: {
      prefix: "/api",
    },
  });

  // Autoload Hooks from the specified directory
  fastifyApp.register(fastifyAutoload, {
    dir: join(__dirname, "hooks"),
  });

  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [SequenceResolverClass],
    emitSchemaFile: true,
  });

  const opts: FastifyRegisterOptions<MercuriusOptions> = {
    schema,
    graphiql: true,
    errorFormatter: (executionResult, context) => {
      console.log(executionResult);
      const log = context.reply ? context.reply.log : context.app.log;
      //@ts-ignore
      const errors = executionResult.errors.map((error) => {
        error.extensions.exception = error.originalError;
        Object.defineProperty(error, "extensions", { enumerable: true });
        return error;
      });
      log.info({ err: executionResult.errors }, "Argument Validation Error");
      return {
        statusCode: 201,
        response: {
          data: executionResult.data,
          errors,
        },
      };
    },
  };

  await fastifyApp.register(mercurius, opts);

  // Return the configured Fastify application instance
  return fastifyApp;
};

import fastify from "fastify";
import cors from "@fastify/cors";
import { CustomFastifyInstance } from "./interfaces";
import fastifyAutoload from "@fastify/autoload";
import { join } from "path";
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const envToLogger: any = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};

// Function to build and configure the Fastify application instance
export const buildApp = async function (): Promise<CustomFastifyInstance> {
  // Create a new Fastify instance with logger enabled
  const fastifyApp: CustomFastifyInstance = fastify({
    logger: envToLogger[process.env.ENVIRONMENT || "development"] ?? true,
  });

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

  // Return the configured Fastify application instance
  return fastifyApp;
};

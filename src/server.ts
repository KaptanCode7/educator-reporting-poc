import { buildApp } from "./app";

buildApp()
  .then((fastifyApp) =>
    fastifyApp.listen(
      { port: parseInt(process.env.FASTIFY_SERVER_PORT || "3000") },
      (err, address) => {
        if (err) {
          fastifyApp.log.error(err);
          process.exit(1);
        }
      }
    )
  )
  .catch((error) => {
    throw new Error(error);
  });

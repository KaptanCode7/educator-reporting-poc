import { buildApp } from "./app";

buildApp()
  .then((fastifyApp) =>
    fastifyApp.listen({ port: 3000 }, (err, address) => {
      if (err) {
        fastifyApp.log.error(err);
        process.exit(1);
      }
    })
  )
  .catch((error) => {
    console.log(`Error ${error}`); // TODO: use logger
  });

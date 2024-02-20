import {buildApp} from './app'

const fastifyApp = buildApp();

fastifyApp.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastifyApp.log.error(err);
    process.exit(1);
  }
});

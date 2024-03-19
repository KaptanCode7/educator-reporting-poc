import fastifyPlugin from "fastify-plugin";
import { CustomFastifyInstance } from "../interfaces";

/**
 * These are hooks attached to onReady event of fastify Apps lifeCycle
 * @param fastifyApp
 */
export const intitalizeOnReadyHooks = async function (
  fastifyApp: CustomFastifyInstance
) {
  fastifyApp.addHook("onReady", async () => {
    /* Decorate the FastifyApp instance with additional properties or methods.
           - In this case, decorate with 'reportingDbInstance'
        **/
    fastifyApp.decorate(
      "reportingDbInstance",
      fastifyApp.mongo.client.db(process.env.REPORTING_DB_NAME)
    );
    // fastifyApp.log.info(`\n ${fastifyApp. printPlugins()}`); // log plugin tree
    fastifyApp.log.info(`\n ${fastifyApp.printRoutes()}`); // log the routes
  });
};

export default fastifyPlugin(intitalizeOnReadyHooks);

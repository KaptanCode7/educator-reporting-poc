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
      //'reportingDbInstance' is set to the MongoDB client's 'newReportingDB' database
      fastifyApp.mongo.client.db("newReportingDB")
    );
    fastifyApp.log.info(`\n ${fastifyApp.printRoutes()}`); // log the routes
  });
};

export default fastifyPlugin(intitalizeOnReadyHooks);

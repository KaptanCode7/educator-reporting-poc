import { sequenceController } from "./sequences.controller";
import { CustomFastifyInstance } from "../../interfaces";

export default async function sequenceRoutes(
  fastifyApp: CustomFastifyInstance
) {
  fastifyApp.get("/sequences", { handler: sequenceController.getSequences });
  fastifyApp.get("/sequences/:sequenceId", {
    handler: sequenceController.getSequenceById,
  });
}

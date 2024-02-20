import { FastifyRequest, FastifyReply } from "fastify";
import { sequenceService } from "./assignment-student-group.service";
import { CustomFastifyInstance } from "../../interfaces";

// define the type of the Params
type ParamsType = { sequenceId: string };

export const sequenceController = {
  getSequences: async function (
    this: CustomFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const sequences = await sequenceService.getSequences(this.reportingDbInstance);
    return reply.send(sequences);
  },

  getSequenceById: async function (
    this: CustomFastifyInstance,
    request: FastifyRequest<{ Params: ParamsType }>,
    reply: FastifyReply
  ) {
    const { params } = request;
    const sequence = await sequenceService.getSequenceById(
      this.reportingDbInstance,
      params.sequenceId
    );
    if (!sequence) {
      reply.code(404).send({ error: "Sequence not found" });
      return;
    }
    reply.send(sequence);
  },
};

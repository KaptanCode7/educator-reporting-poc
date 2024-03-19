import {
  SequenceScoreDetailType,
  SequenceType,
} from "../../types/SequenceType";
import { sequenceService } from "../../modules/sequences/sequences.service";
import { CustomFastifyInstance } from "../../interfaces";
import { MercuriusContext } from "mercurius";

export const sequenceResolver = {
  Query: {
    /**
     * Resolver to fetch a sequence by sequenceId
     * @param {object} _
     * @param {string} sequenceId  Sequence ID
     */
    getSequence: async (
      _: unknown,
      { sequenceId }: { sequenceId: string },
      { app }: MercuriusContext
    ): Promise<SequenceType | null> => {
      const fastifyApp: CustomFastifyInstance = app;
      const sequence = await sequenceService.getSequenceById(
        fastifyApp.reportingDbInstance,
        sequenceId
      );

      return sequence;
    },

    /**
     * Simple resolver for a hello world query
     */
    helloWorld: async (): Promise<string> => "Hello, World!",
  },

  Sequence: {
      /**
       * Resolver to fetch the score details for a sequence
       * @param {Sequence} sequence  The Sequence object
       */
      scoreDetails: async (sequence: SequenceType): Promise<SequenceScoreDetailType[] | null> => {
          // Implement your logic to fetch the score details for the sequence
          // For example, you can access it directly from the sequence object
          return sequence.scoreDetails;
      },
  },
};

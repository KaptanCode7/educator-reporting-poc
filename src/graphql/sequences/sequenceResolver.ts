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

// Dummy function to simulate fetching a sequence from a database
async function fetchSequenceFromDatabase(
  sequenceId: string
): Promise<SequenceType | null> {
  // Implement your database query logic here
  // This is just a dummy implementation
  return {
    sequenceId,
    userId: "dummyUserId",
    tenantId: "dummyTenantId",
    productCode: "dummyProductCode",
    programCode: "dummyProgramCode",
    scoreDetails: [
      {
        correctAnswer: 10,
        incorrectAnswer: 5,
        notAnswered: 3,
        attemptedQuestion: 18,
        omittedQuestion: 2,
      },
    ],
  };
}

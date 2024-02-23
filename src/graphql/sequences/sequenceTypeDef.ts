import { gql } from "mercurius-codegen";

export const sequenceTypeDefs = gql`
  type SequenceScoreDetail {
    correctAnswer: Int
    incorrectAnswer: Int
    notAnswered: Int 
    attemptedQuestion: Int
    omittedQuestion: Int
  }

  type Sequence {
    sequenceId: String
    userId: String
    tenantId: String
    productCode: String
    programCode: String
    scoreDetails: [SequenceScoreDetail]
  }

  type Query {
    getSequence(sequenceId: String!): Sequence
    helloWorld: String!
  }`;

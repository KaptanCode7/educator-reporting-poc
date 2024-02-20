export type SequenceScoreDetailType = {
  correctAnswer: number;
  incorrectAnswer: number;
  notAnswered: number;
  attemptedQuestion: number;
  omittedQuestion: number;
};

export type SequenceType = {
  sequenceId: string;
  userId: string;
  tenantId: string;
  productCode: string;
  programCode: string;
  scoreDetails: SequenceScoreDetailType[];
};

import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Object representing cooking recipe" })
export class SequenceScoreDetailsSchemaClass {
  @Field()
  correctAnswer: number = 0;

  @Field()
  incorrectAnswer: number = 0;

  @Field()
  notAnswered: number = 0;

  @Field()
  attemptedQuestion: number = 0;

  @Field()
  omittedQuestion: number = 0;

  @Field()
  sequenceId: number = 0;

  toJSON() {
    return {
      correctAnswer: this.correctAnswer,
      incorrectAnswer: this.incorrectAnswer,
      notAnswered: this.notAnswered,
      attemptedQuestion: this.attemptedQuestion,
      omittedQuestion: this.omittedQuestion,
      sequenceId: this.sequenceId,
      // Add any additional properties you want to include in the JSON representation
    };
  }
}

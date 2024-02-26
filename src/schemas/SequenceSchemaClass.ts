// recipe.ts
import {
  Arg,
  Field,
  ObjectType,
  Int,
  Float,
  Resolver,
  Query,
} from "type-graphql";
import { SequenceScoreDetailsSchemaClass } from "./SequenceScoreDetailsSchemaClass";

@ObjectType({ description: "Object representing cooking recipe" })
export class SequenceSchemaClass {
  @Field()
  sequenceId: string = "";

  @Field()
  userId: string = "";

  @Field()
  tenantId: string = "";

  @Field()
  productCode: string = "";

  @Field()
  programCode: string = "";

  // @Field(type => [SequenceScoreDetailsSchemaClass])
  // scoreDetails: SequenceScoreDetailsSchemaClass[] = [];

  //   @Field((type) => String, {
  //     nullable: true,
  //     deprecationReason: "Use `description` field instead",
  //   })
  //   get specification(): string | undefined {
  //     return this.description;
  //   }

  //   @Field({
  //     nullable: true,
  //     description: "The recipe description with preparation info",
  //   })
  //   description?: string;

  //   @Field((type) => [Int])
  //   ratings: number[];

  //   @Field()
  //   creationDate: Date;
}

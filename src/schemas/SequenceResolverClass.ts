import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";
import { SequenceSchemaClass } from "./SequenceSchemaClass";
// import { MercuriusContext } from "mercurius";
import { CustomFastifyInstance } from "../interfaces";
// import { sequenceService } from "../modules/sequences/sequences.service";

@ObjectType({ description: "Object representing cooking recipe" })
export class Recipe {
  @Field()
  title!: string;
}

@Resolver(() => Recipe)
export class SequenceResolverClass {
  @Query((returns) => SequenceSchemaClass, { nullable: true })
  async getSequenceNew(
    @Arg("sequenceIdNew") sequenceIdNew: string
  ): Promise<Omit<SequenceSchemaClass, "specification"> | undefined> {
    console.log("sequenceIdNew", sequenceIdNew);
    // console.log("sequenceId", sequenceId)
    // const fastifyApp: CustomFastifyInstance = app;
    // const sequence : any = await sequenceService.getSequenceById(
    //   fastifyApp.reportingDbInstance,
    //   sequenceId
    // );
    const val: any = {
      sequenceId: "1",
      userId: "1",
      tenantId: "1",
      productCode: "1",
      programCode: "1",
    };
    return val;
  }

  @Query((returns) => Recipe, { nullable: true })
  async recipe(@Arg("title") title: string): Promise<Recipe | undefined> {
    return {
      //   description: "Desc 1",
      title: title,
      //   ratings: [0, 3, 1],
      //   creationDate: new Date("2018-04-11"),
    };
  }
}

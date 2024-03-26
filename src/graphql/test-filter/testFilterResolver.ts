import { MercuriusContext } from "mercurius";
import { CustomFastifyInstance } from "../../interfaces";
import { testDetailsService } from "../../modules/test-details/testDetails.service";
import { TestFilterCollectionDto } from "../graphql-interfaces/dtos/testFilterCollection.interface";
import { testDetailsFilterSelectionGraphQLArgs } from "../graphql-interfaces/query-args/test-filter-arguments";

export const testFilterResolver = {
  Query: {
    testDetailsFilterSelection: async (
      _: unknown,
      args: testDetailsFilterSelectionGraphQLArgs,
      { app }: MercuriusContext
    ): Promise<TestFilterCollectionDto[]> => {
      const fastifyApp: CustomFastifyInstance = app;
      //   const tenantIdForQuery = fastifyApp.platformInfo.isPlatform()
      //     ? fastifyApp.platformInfo.getTenantId()
      //     : args.tenantId;

      const tenantIdForQuery = "12133";

      try {
       
        const testFilterResult: TestFilterCollectionDto[] =
          await testDetailsService.getTestFilters(
            fastifyApp.reportingDbInstance,
            tenantIdForQuery,
            args.studentGroups,
            args.studentGroupIds,
            args.excludeTestTypes,
            args.testTypes,
            args.atomEnrollmentIds,
            args.classIds
          );

        return testFilterResult;
      } catch (error) {
        app.log.error(
          "Error occurred while querying paginatedTestDetails",
          error
        );
        throw error;
      }
    },
  },
};

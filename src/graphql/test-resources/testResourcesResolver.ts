import { MercuriusContext } from "mercurius";
import { CustomFastifyInstance } from "../../interfaces";
import { testDetailsService } from "../../modules/test-details/testDetails.service";
import { PaginatedResourceCompletedDto } from "../graphql-interfaces/dtos/paginatedCompletedResources.interface";
import { paginatedCompletedResourcesGraphQLArgs } from "../graphql-interfaces/query-args/test-resources-arguments";

export const testResourcesResolver = {
  Query: {
    paginatedCompletedResources: async (
      _: unknown,
      args: paginatedCompletedResourcesGraphQLArgs,
      { app }: MercuriusContext
    ): Promise<PaginatedResourceCompletedDto | null> => {
      const fastifyApp: CustomFastifyInstance = app;
      //   const tenantIdForQuery = fastifyApp.platformInfo.isPlatform()
      //     ? fastifyApp.platformInfo.getTenantId()
      //     : args.tenantId;

      const tenantIdForQuery = "12133";

      try {
        const paginatedResult: PaginatedResourceCompletedDto =
          await testDetailsService.getPaginatedTestDetails(
            fastifyApp.reportingDbInstance,
            tenantIdForQuery,
            args.studentGroups,
            args.studentGroupIds,
            args.atomEnrollmentIds,
            args.classIds,
            args.customGroupIds,
            args.userIds,
            args.testName,
            args.testTitle,
            args.testType,
            args.mappedTestType,
            args.scaledScoreTestTypes,
            args.startDate,
            args.endDate,
            args.limit || 50,
            args.skip || 0,
            args.sortField || "testCompletedAt",
            args.sortDirection || "1",
            args.scoreFrom,
            args.scoreTo,
            args.sortedTestTypes,
            args.disable_remediation_flag || false,
            args.disable_performance_flag || false
          );

        return paginatedResult;
      } catch (error) {
        app.log.error(
          "Error occurred while querying paginatedTestDetails",
          error
        );
        return null;
      }
    },
  },
};

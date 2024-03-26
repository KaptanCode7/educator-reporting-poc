import { PaginatedResourceCompletedDto } from "../../graphql/graphql-interfaces/dtos/paginatedCompletedResources.interface";
import { ResourceCompletedDto } from "../../graphql/graphql-interfaces/dtos/resourceCompleted.interface";
import {
  isEmpty,
  isNotEmpty,
  logJson,
} from "../../libs/utils/helper-functions";
import { genericAggregation } from "../../libs/mongo-db-functions";
import {
  constructMongoFilterCriteria,
} from "../../libs/mongo-query-helper-functions";
import { TestFilterCollectionDto } from "../../graphql/graphql-interfaces/dtos/testFilterCollection.interface";

const ERROR_MESSAGE_1 =
  "Required parameter missing. Must provide any of the following: atomEnrollmentIds, classIds, or studentGroupsIds.";
const ERROR_MESSAGE_2 =
  "Invalid test type filters passed. Must provide only one of excludeTestTypes and testTypes.";

export const testDetailsService = {
  getPaginatedTestDetails: async function (
    db: any,
    tenantId: string,
    studentGroups?: string[],
    studentGroupIds?: number[],
    atomEnrollmentIds?: string[],
    classIds?: string[],
    customGroupIds?: string[],
    userIds?: string[],
    testName?: string[],
    testTitle?: string[],
    testType?: string[],
    mappedTestType?: string[],
    scaledScoreTestTypes?: string[],
    startDate?: string,
    endDate?: string,
    limit: number = 0,
    skip: number = 0,
    sortField: string = "completedAt",
    sortDirection: string = "-1",
    scoreFrom?: number,
    scoreTo?: number,
    sortedTestTypes?: string[],
    disable_remediation_flag?: boolean,
    disable_performance_flag?: boolean
  ): Promise<PaginatedResourceCompletedDto> {
    try {
      // Your database logic here
      // const testDetailsCollection = db.collection("sequencesNew");
      const testDetailsCollection = db.collection("test_detail");
      // Add your query and aggregation logic based on your data model

      // Your business logic here
      const usePercentCorrect: boolean =
        sortField === "percentCorrect" && scaledScoreTestTypes !== null;
      const useScaledScore: boolean =
        sortField === "scaledScore" && scaledScoreTestTypes !== null;

      const sortedByRemediation: boolean =
        sortField === "totalReviewedQuestions";
      const useSortFieldIndex: boolean =
        sortField === "testType" ||
        sortField === "className" ||
        sortField === "customGroup";

      const matchStage: any = {
        $match: {
          $and: [
            ...constructMongoFilterCriteria({
              studentGroups: studentGroups,
              studentGroupIds: studentGroupIds,
              atomEnrollmentIds: atomEnrollmentIds,
              classIds: classIds,
              customGroupIds: customGroupIds,
              userIds: userIds,
              testName: testName,
              testTitle: testTitle,
              testType: testType,
              mappedTestType: mappedTestType,
              startDate: undefined,
              endDate: undefined,
            }),
          ],
        },
      };

      const projectStage = {
        $project: {
          atomEnrollmentId: "$atomEnrollmentId",
          categoryDetails: "$categoryDetails",
          scoreDetails: "$scoreDetails",
          classId: "$classId",
          customGroupIds: "$customGroupIds",
          firstName: "$firstName",
          lastName: "$lastName",
          userId: "$userId",
          testId: "$testId",
          testType: "$testType",
          mappedTestType: "$mappedTestType",
          testName: "$testName",
          testTitle: "$testTitle",
          studentGroupId: "$studentGroupId",
          studentGroup: "$studentGroup",
          studentGroupName: "$studentGroupName",
          testCompletedAt: {
            $dateFromString: { dateString: "$testCompletedAt" },
          },
          score: "$score",
          maxScore: {
            $ifNull: ["$$ROOT.maxScore", "$$ROOT.noOfQuestions"],
          },
          scaledScore: useScaledScore
            ? {
                $cond: [
                  {
                    $not: {
                      $in: ["$testType", scaledScoreTestTypes],
                    },
                  },
                  null,
                  "$scaledScore",
                ],
              }
            : "$scaledScore",

          noOfQuestions: "$noOfQuestions",
          totalAnswered: "$scoreDetails.attemptedQuestion",
          normedCorrectPercentage: "$normedCorrectPercentage",
          scoreThresholdPercentage: "$scoreThresholdPercentage",
          percentileRank: "$percentileRank",
          timeUsed: "$timeUsed",
          timeSpent: "$timeSpent",
          navigationAlerts: "$navigationAlerts",
          percentCorrect: usePercentCorrect
            ? {
                $cond: [
                  { $in: ["$testType", scaledScoreTestTypes] },
                  null,
                  "$percentCorrect",
                ],
              }
            : "$percentCorrect",
          attemptNumber: "$attemptNumber",
          totalReviewTime: "$totalReviewTime",
          totalReviewedQuestions: sortedByRemediation
            ? {
                $switch: {
                  branches: [
                    {
                      case: {
                        $in: [
                          "$testType",
                          ["video-set", "Essential Nursing Skills"],
                        ],
                      },
                      then: null,
                    },
                    {
                      case: { $lte: ["$totalReviewedQuestions", null] },
                      then: 0,
                    },
                  ],
                  default: "$totalReviewedQuestions",
                },
              }
            : "$totalReviewedQuestions",
          sortFieldIndex: "$sortFieldIndex",
        },
      };

      const mongoIndexArray = []; // Example: mongoIndexArray = ["testType", "$testType"]

      if (sortField == "testType") {
        mongoIndexArray.push(sortedTestTypes);
        mongoIndexArray.push("$testType");
      } else {
        mongoIndexArray.push(atomEnrollmentIds);
        mongoIndexArray.push("$atomEnrollmentIds");
      }

      const addFieldsStage = {
        $addFields: {
          sortFieldIndex: {
            $indexOfArray: mongoIndexArray,
          },
        },
      };

      // Sort Condtions
      const sortConditions: any = {
        $sort: {},
      };
      if (useSortFieldIndex) {
        sortConditions["$sort"]["sortFieldIndex"] = parseInt(sortDirection);
      } else {
        sortConditions["$sort"][sortField] = parseInt(sortDirection);
      }
      sortConditions["$sort"]["_id"] = 1;

      // Limit Condtions
      const limitConditions = {
        $limit: limit,
      };

      //Skip conditions
      const skipConditions = {
        $skip: skip,
      };

      // Facet Stage
      const facetStage = {
        $facet: {
          paginatedResults: [
            projectStage,
            sortConditions,
            skipConditions,
            limitConditions,
          ],
          totalCount: [{ $count: "count" }],
        },
      };

      if (scoreFrom) {
        matchStage["$match"]["$and"].push({
          $expr: {
            $gte: [
              {
                $round: ["$percentCorrect", 0],
              },
              scoreFrom,
            ],
          },
        });
      }

      if (scoreTo) {
        matchStage["$match"]["$and"].push({
          percentCorrect: { $lte: scoreTo },
        });
      }

      if (disable_performance_flag && disable_remediation_flag) {
        matchStage["$match"]["$and"].push({
          $or: [
            {
              $and: [
                {
                  noOfQuestions: {
                    $gt: 0,
                  },
                },
                {
                  $expr: {
                    $ne: ["$totalReviewedQuestions", "$noOfQuestions"],
                  },
                },
              ],
            },
            {
              $and: [
                {
                  percentCorrect: {
                    $ne: null,
                  },
                },
                {
                  scoreThresholdPercentage: {
                    $ne: null,
                  },
                },
                {
                  $expr: {
                    $lt: ["$percentCorrect", "$scoreThresholdPercentage"],
                  },
                },
              ],
            },
          ],
        });
      } else {
        if (disable_remediation_flag) {
          matchStage["match"]["$and"].push(
            { noOfQuestions: { $gt: 0 } },
            { $expr: { $ne: ["$totalReviewedQuestions", "$noOfQuestions"] } }
          );
        }
        if (disable_performance_flag) {
          matchStage["match"]["$and"].push(
            { percentCorrect: { $ne: null } },
            { scoreThresholdPercentage: { $ne: null } },
            { $expr: { $ne: ["$totalReviewedQuestions", "$noOfQuestions"] } }
          );
        }
      }

      const testMatchStage = {
        $match: {
          enrollmentId: "1307312796",
          sequenceId: "c696139e-8545-42e7-9c61-bfb4c570bcee",
        },
      }; // Testing

      // Construct the aggregation pipeline based on the provided arguments
      const pipeline: object[] = [
        // ... Your aggregation stages based on the args
        matchStage,
        // testMatchStage,
      ];
      if (useSortFieldIndex) {
        pipeline.push(addFieldsStage);
      }
      pipeline.push(facetStage);

      interface countResponse {
        count?: number;
      }

      interface QueryResponse {
        paginatedResults: ResourceCompletedDto[];
        totalCount: countResponse[];
      }

      const aggregationResult: QueryResponse[] =
        await genericAggregation<QueryResponse>(db, {
          collection: testDetailsCollection, // Replace with your actual collection
          pipeline,
        });

      const paginatedResult: PaginatedResourceCompletedDto = {
        // Response structure from genericAggregation function will depend on the query
        // access the response data accordingly
        completedResources: aggregationResult[0].paginatedResults,
        totalCount: aggregationResult[0].totalCount[0]?.count || 0,
        skip,
        limit,
        sortField,
        sortDirection,
      };

      return paginatedResult;
    } catch (error) {
      // Handle errors
      console.error(
        "Error occurred while querying paginatedTestDetails",
        error
      );
      throw error;
    }
  },

  getTestFilters: async function (
    db: any,
    tenantId: string,
    studentGroups?: string[],
    studentGroupIds?: number[],
    excludeTestTypes?: string[],
    testTypes?: string[],
    atomEnrollmentIds?: string[],
    classIds?: string[]
  ) {
    try {
      if (
        isEmpty(studentGroupIds) &&
        isEmpty(atomEnrollmentIds) &&
        isEmpty(classIds)
      ) {
        // atleast one of these arguments should not be empty
        throw Error(ERROR_MESSAGE_1);
      }
      // if testTypes and excludeTestTypes both are there, throw error
      if (isNotEmpty(testTypes) && isNotEmpty(excludeTestTypes)) {
        throw Error(ERROR_MESSAGE_2);
      }
      let excludeTestTypesFlag = isNotEmpty(excludeTestTypes);
      let tesTypeCondition = excludeTestTypesFlag
        ? { excludeTestTypes: excludeTestTypes }
        : { testTypes: testTypes };
      const matchStage: any = {
        $match: {
          $and: [
            ...constructMongoFilterCriteria({
              // tenantId: tenantId,
              studentGroups: studentGroups,
              studentGroupIds: studentGroupIds,
              atomEnrollmentIds: atomEnrollmentIds,
              classIds: classIds,
            }),
            ...constructMongoFilterCriteria(tesTypeCondition),
          ],
        },
      };

      const groupStage: any = {
        $group: {
          _id: {
            studentGroupId: "$studentGroupId",
            classId: "$classId",
            studentGroup: "$studentGroup",
            testName: "$testName",
            testTitle: "$testTitle",
            testType: "$testType",
          },
        },
      };

      const projectStage: any = {
        $project: {
          _id: 0,
          studentGroupId: "$_id.studentGroupId",
          classId: "$_id.classId",
          studentGroup: "$_id.studentGroup",
          testName: "$_id.testName",
          testTitle: "$_id.testTitle",
          testType: "$_id.testType",
        },
      };

      const pipeline: object[] = [];
      pipeline.push(matchStage);
      pipeline.push(groupStage);
      pipeline.push(projectStage);

      const testDetailsCollection = db.collection("test_detail");

      // logJson(pipeline);

      const aggregationResult: TestFilterCollectionDto[] =
        await genericAggregation<TestFilterCollectionDto>(db, {
          collection: testDetailsCollection,
          pipeline,
        });

      return aggregationResult;
    } catch (error) {
      throw error;
    }
  },
};

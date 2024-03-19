import { gql } from "mercurius-codegen";

export const testResourcesTypeDefs = gql`
  type CategoryDetailsCollection {
    normedCorrectPercentage: Float
    noOfQuestions: Int
    score: Float
    categoryId: String
    subCategoryId: String
    categoryName: String
    subCategoryName: String
    subStrandName: String
    subStrandTitle: String
    maxScore: Float
  }

  type ScoreDetailsCollection {
    correctAnswer: Int
    incorrectAnswer: Int
    notAnswered: Int
    omittedQuestion: Int
    notScored: Int
  }

  type ResourceCompleted {
    id: String
    tenantId: String
    testId: String
    firstName: String
    lastName: String
    studentGroupId: Int
    studentGroupName: String
    studentGroup: String
    testType: String
    mappedTestType: String
    sortField: String
    testTitle: String
    testName: String
    testStartedAt: String
    testCompletedAt: String
    testStatus: String
    score: Float
    maxScore: Float
    scaledScore: Float
    noOfQuestions: Int
    totalAnswered: Int
    normedCorrectPercentage: Float
    scoreThresholdPercentage: Float
    percentileRank: Float
    timeUsed: String
    totalRemediationTime: Float
    timeSpent: String
    navigationAlerts: Int
    percentCorrect: Float
    timesTaken: Int
    syllabusId: String
    attemptNumber: Int
    avgRemediationTime: Float
    totalRemedQuestions: Int
    totalReviewTime: Float
    totalReviewedQuestions: Int
    numberOfAttempts: Int
    scoreTo: Float
    scoreFrom: Float
    userId: String
    atomEnrollmentId: String
    classId: String
    customGroupIds: [String]
    categoryDetails: [CategoryDetailsCollection]
    scoreDetails: ScoreDetailsCollection
  }

  type PaginatedResourceCompleted {
    completedResources: [ResourceCompleted]
    totalCount: Int
    skip: Int
    limit: Int
    sortField: String
    sortDirection: String
    scoreFrom: Float
    scoreTo: Float
  }

  type Query {
    paginatedCompletedResources(
        studentGroups: [String]
        studentGroupIds: [Int]
        atomEnrollmentIds: [String]
        classIds: [String]
        customGroupIds: [String]
        userIds: [String]
        startDate: String
        endDate: String
        testType: [String]
        mappedTestType: [String]
        scaledScoreTestTypes: [String]
        testName: [String]
        testTitle: [String]
        tenantId: String
        limit: Int
        skip: Int
        sortField: String
        sortDirection: String
        scoreFrom: Float
        scoreTo: Float
        sortedTestTypes: [String]
        disable_remediation_flag: Boolean
        disable_performance_flag: Boolean
      ): PaginatedResourceCompleted
  }
`;

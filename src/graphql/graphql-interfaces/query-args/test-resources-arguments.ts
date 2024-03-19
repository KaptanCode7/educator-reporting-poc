export interface paginatedCompletedResourcesGraphQLArgs {
    studentGroups?: string[];
    studentGroupIds?: number[];
    atomEnrollmentIds?: string[];
    classIds?: string[];
    customGroupIds?: string[];
    userIds?: string[];
    startDate?: string;
    endDate?: string;
    testType?: string[];
    mappedTestType?: string[];
    scaledScoreTestTypes?: string[];
    testName?: string[];
    testTitle?: string[];
    tenantId?: string;
    limit?: number;
    skip?: number;
    sortField?: string;
    sortDirection?: string;
    scoreFrom?: number;
    scoreTo?: number;
    sortedTestTypes?: string[];
    disable_remediation_flag?: boolean;
    disable_performance_flag?: boolean;
  }
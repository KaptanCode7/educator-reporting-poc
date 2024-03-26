enum mongoLogicalOperation {
  IN = "$in",
  NIN = "$nin",
  GTE = "$gte",
  LTE = "$lte",
  EQ = "$eq",
}
export const mongoBuildOperation = function (
  keyName: string,
  values: any[] | string,
  operator: mongoLogicalOperation
) {
  const querySnippet: any = {};
  querySnippet[keyName] = {};
  querySnippet[keyName][operator] = values;
  return querySnippet;
};


export const constructMongoFilterCriteria = function (params: {
  tenantId?: string;
  studentGroups?: string[];
  studentGroupIds?: number[];
  atomEnrollmentIds?: string[];
  classIds?: string[];
  customGroupIds?: string[];
  userIds?: string[];
  testName?: string[];
  testTitle?: string[];
  testType?: string[];
  mappedTestType?: string[];
  startDate?: string;
  endDate?: string;
  excludeTestTypes?: string[];
}): any[] {
  let snippetArray: any[] = [];

  if (params.studentGroups && params.studentGroups.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "studentGroup",
        params.studentGroups,
        mongoLogicalOperation.IN
      )
    );
  }
  if (params.studentGroupIds && params.studentGroupIds.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "studentGroupId",
        params.studentGroupIds,
        mongoLogicalOperation.IN
      )
    );
  }
  if (params.testName && params.testName.length > 0) {
    snippetArray.push(
      mongoBuildOperation("testName", params.testName, mongoLogicalOperation.IN)
    );
  }
  if (params.testTitle && params.testTitle.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "testTitle",
        params.testTitle,
        mongoLogicalOperation.IN
      )
    );
  }
  if (params.tenantId && params.tenantId !== "") {
    snippetArray.push(
      mongoBuildOperation("tenantId", params.tenantId, mongoLogicalOperation.EQ)
    );
  }
  if (params.testType && params.testType.length > 0) {
    snippetArray.push(
      mongoBuildOperation("testType", params.testType, mongoLogicalOperation.IN)
    );
  }
  if (params.excludeTestTypes && params.excludeTestTypes.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "testType",
        params.excludeTestTypes,
        mongoLogicalOperation.NIN
      )
    );
  }
  if (params.mappedTestType && params.mappedTestType.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "mappedTestType",
        params.mappedTestType,
        mongoLogicalOperation.IN
      )
    );
  }
  if (params.startDate && params.startDate !== "") {
    snippetArray.push(
      mongoBuildOperation(
        "completedAt",
        params.startDate,
        mongoLogicalOperation.GTE
      )
    );
  }
  if (params.endDate && params.endDate !== "") {
    snippetArray.push(
      mongoBuildOperation(
        "completedAt",
        params.endDate,
        mongoLogicalOperation.LTE
      )
    );
  }
  if (params.atomEnrollmentIds && params.atomEnrollmentIds.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "atomEnrollmentId",
        params.atomEnrollmentIds,
        mongoLogicalOperation.IN
      )
    );
  }
  if (params.classIds && params.classIds.length > 0) {
    snippetArray.push(
      mongoBuildOperation("classId", params.classIds, mongoLogicalOperation.IN)
    );
  }
  if (params.customGroupIds && params.customGroupIds.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "customGroupIds",
        params.customGroupIds,
        mongoLogicalOperation.IN
      )
    );
  }
  if (params.userIds && params.userIds.length > 0) {
    snippetArray.push(
      mongoBuildOperation("userId", params.userIds, mongoLogicalOperation.IN)
    );
  }
  return snippetArray;
};

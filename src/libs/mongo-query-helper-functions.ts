enum mongoLogicalOperation {
  IN = "$in",
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

export const constructMongoFilterCriteria = function (
  tenantId: string | undefined,
  studentGroups: string[] | undefined,
  studentGroupIds: number[] | undefined,
  atomEnrollmentIds: string[] | undefined,
  classIds: string[] | undefined,
  customGroupIds: string[] | undefined,
  userIds: string[] | undefined,
  testName: string[] | undefined,
  testTitle: string[] | undefined,
  testType: string[] | undefined,
  mappedTestType: string[] | undefined,
  startDate: string | undefined,
  endDate: string | undefined
): any[] {
  let snippetArray: any[] = [];

  if (studentGroups && studentGroups.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "studentGroup",
        studentGroups,
        mongoLogicalOperation.IN
      )
    );
  }
  if (studentGroupIds && studentGroupIds.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "studentGroupId",
        studentGroupIds,
        mongoLogicalOperation.IN
      )
    );
  }
  if (testName && testName.length > 0) {
    snippetArray.push(
      mongoBuildOperation("testName", testName, mongoLogicalOperation.IN)
    );
  }
  if (testTitle && testTitle.length > 0) {
    snippetArray.push(
      mongoBuildOperation("testTitle", testTitle, mongoLogicalOperation.IN)
    );
  }
  if (tenantId && tenantId !== "") {
    snippetArray.push(mongoBuildOperation("tenantId", tenantId, mongoLogicalOperation.EQ));
  }
  if (testType && testType.length > 0) {
    snippetArray.push(
      mongoBuildOperation("testType", testType, mongoLogicalOperation.IN)
    );
  }
  if (mappedTestType && mappedTestType.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "mappedTestType",
        mappedTestType,
        mongoLogicalOperation.IN
      )
    );
  }
  if (startDate && startDate !== "") {
    snippetArray.push(
      mongoBuildOperation(
        "completedAt",
        startDate,
        mongoLogicalOperation.GTE
      )
    );
  }
  if (endDate && endDate !== "") {
    snippetArray.push(
      mongoBuildOperation(
        "completedAt",
        endDate,
        mongoLogicalOperation.LTE
      )
    );
  }
  if (atomEnrollmentIds && atomEnrollmentIds.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "atomEnrollmentId",
        atomEnrollmentIds,
        mongoLogicalOperation.IN
      )
    );
  }
  if (classIds && classIds.length > 0) {
    snippetArray.push(
      mongoBuildOperation("classId", classIds, mongoLogicalOperation.IN)
    );
  }
  if (customGroupIds && customGroupIds.length > 0) {
    snippetArray.push(
      mongoBuildOperation(
        "customGroupIds",
        customGroupIds,
        mongoLogicalOperation.IN
      )
    );
  }
  if (userIds && userIds.length > 0) {
    snippetArray.push(
      mongoBuildOperation("userId", userIds, mongoLogicalOperation.IN)
    );
  }
  return snippetArray;
};

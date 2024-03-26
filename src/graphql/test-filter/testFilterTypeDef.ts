import { gql } from "mercurius-codegen";

export const testFilterTypeDefs = gql`
  type TestFilterCollection {
    id: String
    tenantId: String
    studentGroup: String
    testType: String
    testTitle: String
    testName: String
    categoryName: String
    taxonomyName: String
    studentGroupId: Int
    classId: String
    atomEnrollmentIds: [String]
  }

  type Query {
    testDetailsFilterSelection(
      tenantId: String
      studentGroup: [String]
      studentGroupIds: [Int]
      classIds: [String]
      atomEnrollmentIds: [String]
      excludeTestTypes: [String]
      testTypes: [String]
    ): [TestFilterCollection]
  }
`;

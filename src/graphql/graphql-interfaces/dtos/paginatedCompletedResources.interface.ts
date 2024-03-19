import { ResourceCompletedDto } from "./resourceCompleted.interface";
import { Document as MongoDocument } from "mongodb";

export interface PaginatedResourceCompletedDto extends MongoDocument {
  completedResources: ResourceCompletedDto[];
  totalCount: number;
  skip: number;
  limit: number;
  sortField?: string;
  sortDirection?: string;
  scoreFrom?: number;
  scoreTo?: number;
}

import {
  Collection,
  AggregationCursor,
  Db,
  Document as MongoDocument,
} from "mongodb";

interface AggregationOptions<T extends MongoDocument> {
  collection: Collection<T>;
  pipeline: object[];
}

const collationOptions = {
  locale: "en_US",
  strength: 1,
  numericOrdering: true,
};

export async function genericAggregation<T extends MongoDocument>(
  db: Db,
  options: AggregationOptions<T>,
  collation: any = collationOptions
): Promise<T[]> {
  const cursor: AggregationCursor<T> = await db
    .collection(options.collection.collectionName)
    .aggregate(options.pipeline, {
      allowDiskUse: true,
      collation: collation,
    });
  const result: T[] = await cursor.toArray();
  return result;
}

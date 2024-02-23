import { SequenceType } from "../../types/SequenceType";

export const sequenceService = {
  getSequences: async function (db: any): Promise<SequenceType[]> {
    const sequencesCollection = db.collection("sequences");
    const sequences: SequenceType[] = await sequencesCollection
      .find()
      .toArray();
    return sequences;
  },

  getSequenceById: async function (
    db: any,
    id: string
  ): Promise<SequenceType | null> {
    const sequencesCollection = db.collection("sequences");
    const sequence: SequenceType | null = await sequencesCollection.findOne({
      sequenceId: id,
    });
    return sequence;
  },
};

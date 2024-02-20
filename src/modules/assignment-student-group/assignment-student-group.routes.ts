// modules/user/route.ts
import { FastifyInstance } from 'fastify';
import { sequenceController } from './assignment-student-group.controller';
import { CustomFastifyInstance } from '../../interfaces';

export default async function sequenceRoutes(fastifyApp: CustomFastifyInstance) {

  fastifyApp.get('/sequences',  sequenceController.getSequences );
  fastifyApp.get('/sequences/:sequenceId', sequenceController.getSequenceById);
}

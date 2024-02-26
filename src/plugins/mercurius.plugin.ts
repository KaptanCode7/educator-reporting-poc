// import mercurius from "mercurius";
// import { CustomFastifyInstance } from "../interfaces";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
// import { sequenceTypeDefs } from "../graphql/sequences/sequenceTypeDef";
import { getAllResolvers } from "../graphql";
import fastifyPlugin from "fastify-plugin";

// async function mercuriusPlugin(fastifyApp: CustomFastifyInstance) {
//   fastifyApp.register(mercurius, {
//     schema: makeExecutableSchema({
//       // Merge type definitions from different sources
//       typeDefs: mergeTypeDefs([sequenceTypeDefs]),
//       // Merge resolvers from different sources
//       // resolvers: mergeResolvers([sequenceResolver]),
//       resolvers: mergeResolvers(getAllResolvers()),
//     }),
//     graphiql: true,
//   });
// }
// export default fastifyPlugin(mercuriusPlugin); : Turned - off temporarily

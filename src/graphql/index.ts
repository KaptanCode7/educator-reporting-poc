import { sequenceResolver } from "./sequences/sequenceResolver";

export const getAllResolvers = function(): any[]{
    const resolversArray: any = [];
    // Push your resolver object into this Array, to register your Resolver
    resolversArray.push(sequenceResolver);  
    return resolversArray;
}
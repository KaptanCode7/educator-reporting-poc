import { sequenceResolver } from "./sequences/sequenceResolver";
import { sequenceTypeDefs } from "./sequences/sequenceTypeDef";
import { testResourcesResolver } from "./test-resources/testResourcesResolver";
import { testResourcesTypeDefs } from "./test-resources/testResourcesTypeDef";

export const getAllResolvers = function(): any[]{
    const resolversArray: any = [];
    // Push your resolver object into this Array, to register your Resolver
    resolversArray.push(sequenceResolver);  
    resolversArray.push(testResourcesResolver);  
    return resolversArray;
}

export const getAllTypeDefs = function(): any[]{
    const typeDefsArray: any = [];
    // Push your TypeDefs into this Array, to register your TypeDefs
    typeDefsArray.push(sequenceTypeDefs);
    typeDefsArray.push(testResourcesTypeDefs);    
    return typeDefsArray;
}
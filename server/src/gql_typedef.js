const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
module.exports.typeDefs = gql`
    type Query {
        search_s1(keywords: [Int]!, uid: String!): s1!
        search_s2(keywordRands: [Int]!, index: [Int]!, uid: String!): [String]!
    }

    type Mutation {
        createKey(keys: [String]!, uid: String!): Boolean!
        createUser(uid: String!): String!
        createData(uid: String!, data: String!): Boolean!
    }

    type s1 {
        enc_rs: [String]!
        index: [Int]!
    }
`;

const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
module.exports.typeDefs = gql`
    type Query {
        search_s1(keywords: [Int]!, uid: String!): [String]!
        search_s2(
            keywordRands: [Int]!
            enc_rs: [String]!
            uid: String!
        ): [String]!
    }

    type Mutation {
        createKey(keys: [String]!, uid: String!): Boolean!
        createUser(uid: String!): String!
        createData(uid: String!, data: String!): Boolean!
    }
`;

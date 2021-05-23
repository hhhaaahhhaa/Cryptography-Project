const { gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
module.exports.typeDefs = gql`
  type Query {
    search_keyword(keywords: [Int]!, uid: String!): keyword_results!
    search_s1(keywords: [Int]!, uid: String!): s1!
    search_s2(keywordRands: [Int]!, index: [Int]!, uid: String!): [String]!
  }

  type Mutation {
    createKey(
      f_kf: Int!
      idx_MGF1: String!
      enc_r: String!
      uid: String!
    ): Boolean!
    updateKey(
      f_kf: Int!
      idx_MGF1: String!
      enc_r: String!
      uid: String!
    ): Boolean!
    createUser(uid: String!): String!
    createData(uid: String!, data: String!): Int!
  }

  type s1 {
    enc_rs: [String]!
    index: [Int]!
  }

  type keyword_results {
    i_xor_g: [String]!
    e_g_r: [String]!
  }
`;

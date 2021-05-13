import { gql } from "@apollo/client";

export const SEARCH_S1_QUERY = gql`
    query search_s1($keywords: [Int]!, $uid: String!) {
        search_s1(keywords: $keywords, uid: $uid) {
            enc_rs
            index
        }
    }
`;

export const SEARCH_S2_QUERY = gql`
    query search_s2($keywordRands: [Int]!, $index: [Int]!, $uid: String!) {
        search_s2(keywordRands: $keywordRands, index: $index, uid: $uid)
    }
`;

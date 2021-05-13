import { gql } from "@apollo/client";

export const SEARCH_S1_QUERY = gql`
    query search_s1($keywords: [Int]!, $uid: String!) {
        search_s1(keywords: $keywords, uid: $uid)
    }
`;

export const SEARCH_S2_QUERY = gql`
    query search_s2($keywordRands: [Int]!, $enc_rs: [String]!, $uid: String!) {
        search_s2(keywordRands: $keywordRands, enc_rs: $enc_rs, uid: $uid)
    }
`;

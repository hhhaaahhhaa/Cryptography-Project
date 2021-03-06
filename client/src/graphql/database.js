import { gql } from "@apollo/client";

export const SEARCH_KEYWORD_QUERY = gql`
  query search_keyword($keywords: [Int]!, $uid: String!) {
    search_keyword(keywords: $keywords, uid: $uid) {
      i_xor_g
      e_g_r
    }
  }
`;

export const SEARCH_S1_QUERY = gql`
  query search_s1($keywords: [Int]!, $uid: String!) {
    search_s1(keywords: $keywords, uid: $uid) {
      enc_rs
      index
    }
  }
`;

export const SEARCH_S2_QUERY = gql`
  query search_s2($keywordRands: [Float]!, $index: [Int]!, $uid: String!) {
    search_s2(keywordRands: $keywordRands, index: $index, uid: $uid)
  }
`;

export const UPLOAD_FILE_MUTATE = gql`
  mutation create_data($uid: String!, $data: String!) {
    createData(uid: $uid, data: $data)
  }
`;

export const CREATE_KEY_MUTATE = gql`
  mutation create_key(
    $f_kf: Int!
    $idx_MGF1: String!
    $enc_r: String!
    $uid: String!
  ) {
    createKey(f_kf: $f_kf, idx_MGF1: $idx_MGF1, enc_r: $enc_r, uid: $uid)
  }
`;

export const UPDATE_KEY_MUTATE = gql`
  mutation update_key(
    $f_kf: Int!
    $idx_MGF1: String!
    $enc_r: String!
    $uid: String!
  ) {
    updateKey(f_kf: $f_kf, idx_MGF1: $idx_MGF1, enc_r: $enc_r, uid: $uid)
  }
`;

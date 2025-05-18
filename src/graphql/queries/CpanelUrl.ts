import { gql } from "@apollo/client";

export const CpanelUrl_QUERY = gql`
  query Query($userName: String!) {
    cpanelUrl(userName: $userName)
  }
`;

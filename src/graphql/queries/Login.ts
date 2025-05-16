import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query logIn($content: loginInfo) {
    logIn(content: $content) {
      token
      user {
        id
        firstname
        lastname
        email
        thumbnail
        phone
        role
        activation
        emailVerify
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;

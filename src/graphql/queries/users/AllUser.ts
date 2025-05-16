import { gql } from "@apollo/client";

export const AllUser_QUERY = gql`
  query AllUser {
    allUser {
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
`;

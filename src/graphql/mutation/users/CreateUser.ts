import { gql } from "@apollo/client";

export const CreateUser_Mutation = gql`
  mutation CreateUser($content: contentUser!) {
    createUser(content: $content) {
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

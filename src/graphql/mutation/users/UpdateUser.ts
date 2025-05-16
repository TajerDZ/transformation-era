import { gql } from "@apollo/client";

export const UpdateUser_Mutation = gql`
  mutation UpdateUser($updateUserId: ID!, $content: contentProfile!) {
    updateUser(id: $updateUserId, content: $content) {
      status
      data {
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

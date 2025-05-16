import { gql } from "@apollo/client";

export const UpdateMyPassword_Mutation = gql`
  mutation UpdateMyPassword(
    $updateMyPasswordId: ID!
    $content: contentPassword!
  ) {
    updateMyPassword(id: $updateMyPasswordId, content: $content) {
      status
    }
  }
`;

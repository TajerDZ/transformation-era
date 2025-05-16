import { gql } from "@apollo/client";

export const ChangePassword_Mutation = gql`
  mutation ChangePassword($content: contentChangePassword) {
    changePassword(content: $content) {
      status
    }
  }
`;

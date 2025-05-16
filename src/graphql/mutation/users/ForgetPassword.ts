import { gql } from "@apollo/client";

export const ForgetPassword_Mutation = gql`
  mutation ForgetPassword($email: String) {
    forgetPassword(email: $email) {
      status
    }
  }
`;

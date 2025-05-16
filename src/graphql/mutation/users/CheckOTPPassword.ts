import { gql } from "@apollo/client";

export const CheckOTPPassword_Mutation = gql`
  mutation CheckOTPPassword($email: String, $code: String) {
    checkOTPPassword(email: $email, code: $code) {
      status
    }
  }
`;

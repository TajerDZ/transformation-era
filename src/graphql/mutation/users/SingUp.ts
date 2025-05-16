import { gql } from "@apollo/client";

export const SingUp_Mutation = gql`
  mutation SingUp($content: contentUser!) {
    singUp(content: $content) {
      id
    }
  }
`;

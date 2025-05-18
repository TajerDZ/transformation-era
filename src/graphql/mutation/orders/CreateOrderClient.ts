import { gql } from "@apollo/client";

export const CreateOrderClient_Mutation = gql`
  mutation CreateOrderClient($content: contentOrderClient!) {
    createOrderClient(content: $content) {
      id
      pricePlans {
        discount
        duration
        id
        key
        value
        link
      }
    }
  }
`;

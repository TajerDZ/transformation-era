import { gql } from "@apollo/client";

export const AllOrderClient_QUERY = gql`
  query AllOrderClient($idUser: ID) {
    allOrderClient(idUser: $idUser) {
      data {
        updated
        product {
          id
          name
          description
          price
          thumbnail
          type
          updatedAt
          plans {
            id
            name
            description
            prices {
              discount
              id
              key
              value
              duration
            }
            details {
              id
              key
              value
            }
          }
        }
        price
        plan {
          id
          name
          description
          prices {
            discount
            id
            key
            value
            duration
          }
        }
        pricePlans {
          discount
          id
          key
          value
          duration
        }
        domainName
        renewalDate
        section
        status
        updatedAt
        id
      }
    }
  }
`;

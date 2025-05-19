import { gql } from "@apollo/client";

export const AllInvoice_QUERY = gql`
  query AllInvoiceClient(
    $idUser: ID
    $filter: [Filter]
    $pagination: Pagination
  ) {
    allInvoiceClient(
      idUser: $idUser
      filter: $filter
      pagination: $pagination
    ) {
      data {
        id
        numberInvoice
        totalPrice
        file
        date
        user {
          lastname
          id
          firstname
        }
        createdAt
        updatedAt
      }
      total
    }
  }
`;

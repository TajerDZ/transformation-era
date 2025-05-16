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
        type
        price
        duration
        totalDiscount
        totalPrice
        subTotalPrice
        tva
        dueDate
        status
        numberInvoice
        createdAt
        id
        order {
          id
          product {
            name
          }
        }
      }
      total
    }
  }
`;

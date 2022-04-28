import { gql } from "@apollo/client";

export const GET_LISTINGS = gql`
  query listing {
    searchForSaleListings(search: {}, limit: 10) {
      listings {
        id
        area
        municipality {
          fullName
        }
        title
        askingPrice {
          amount
        }
        ... on ActivePropertyListing {
          thumbnail {
            url(format: ITEMGALLERY_CUT)
          }
        }
      }
    }
  }
`;

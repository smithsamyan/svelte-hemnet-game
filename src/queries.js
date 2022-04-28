import { gql } from "@apollo/client";

export const GET_LISTINGS = gql`
  query getListings {
    searchForSaleListings(search: { newConstruction: EXCLUDE }, limit: 10) {
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
          description
          thumbnail {
            url(format: ITEMGALLERY_CUT)
          }
        }
        ... on DeactivatedBeforeOpenHousePropertyListing {
          description
          thumbnail {
            url(format: ITEMGALLERY_CUT)
          }
        }
        ... on ProjectUnit {
          projectId
          description
          thumbnail {
            url(format: ITEMGALLERY_CUT)
          }
        }
        ... on Project {
          description
          thumbnail {
            url(format: ITEMGALLERY_CUT)
          }
        }
      }
    }
  }
`;

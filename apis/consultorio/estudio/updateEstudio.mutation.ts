
import gql from "graphql-tag";
const estudiosQuery = gql`
mutation UpdateEstudio($data: EstudioInput!, $estudioId: String!) {
    updateEstudio(data: $data, estudioId: $estudioId)
  }`;

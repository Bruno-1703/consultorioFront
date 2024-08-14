import gql from "graphql-tag";

export default gql`
mutation CreateEstudio($data: EstudioInput!) {
    createEstudio(data: $data)
  }`;
  
import gql from "graphql-tag";

export default gql`
  mutation createCitaEstudio(
    $citaId: String!
    $estudios: [EstudioInput!]!
  ) {
    createCitaEstudio(citaId: $citaId, estudios: $estudios)
  }
`;

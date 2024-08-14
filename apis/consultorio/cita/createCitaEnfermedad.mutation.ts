import gql from "graphql-tag";

export default gql`
  mutation CreateCitaEnfermedad(
    $citaId: String!
    $enfermedades: [EnfermedadInput!]!
  ) {
    createCitaEnfermedad(citaId: $citaId, enfermedades: $enfermedades)
  }
`;

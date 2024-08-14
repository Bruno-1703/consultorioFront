import gql from "graphql-tag";
const PacientesQuery = gql`
  query getPaciente($id: String!) {
    getPaciente(id: $id) {
      ...Paciente
    }
  }
`;

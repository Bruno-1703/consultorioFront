
import gql from "graphql-tag";
const PacientesQuery = gql`
mutation EliminarPaciente($pacienteId: String!) {
  EliminarPaciente(pacienteId: $pacienteId)
}
`;

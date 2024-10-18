
import gql from "graphql-tag";
const PacientesQuery = gql`
mutation ElimiarPacienteLog($pacienteId: String!) {
  ElimiarPacienteLog(pacienteId: $pacienteId)
}

`;

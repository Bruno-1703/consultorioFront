
  import gql from "graphql-tag";
const PacientesQuery = gql`
mutation UpdatePaciente($data: PacienteInput!, $pacienteId: String!) {
    updatePaciente(data: $data, pacienteId: $pacienteId)
  }
`;

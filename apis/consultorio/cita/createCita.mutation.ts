import gql from "graphql-tag";

export default gql`
  mutation createCita($data: CitaInput!, $paciente: PacienteInput!) {
    createCita(data: $data, paciente: $paciente)
  }
`;

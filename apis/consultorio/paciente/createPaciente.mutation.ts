import gql from "graphql-tag";

export default gql`
  mutation CreatePaciente($data: PacienteInput!) {
    createPaciente(data: $data)
  }
`;

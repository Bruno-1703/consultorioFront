import gql from "graphql-tag";

export default gql`
mutation createCita($data: CitaInput!, $paciente: PacienteCitaInput!) {
  createCita(data: $data, paciente: $paciente)
}

`;

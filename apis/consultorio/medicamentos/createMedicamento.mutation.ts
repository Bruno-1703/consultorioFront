import gql from "graphql-tag";

export default gql`
mutation CreateMedicamento($data: MedicamentoInput!) {
    createMedicamento(data: $data)
  }`;
  
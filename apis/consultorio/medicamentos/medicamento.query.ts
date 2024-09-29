import gql from "graphql-tag";
const MedicamentosQuery = gql`
  query getMedicamento($id: String!) {
    getMedicamento(id: $id) {
      ...Medicamento
    }
  }
`;

import gql from "graphql-tag";
const citasQuery = gql`
  query getCita($id: String!) {
    getCita(id: $id) {
      ...Cita
    }
  }
`;

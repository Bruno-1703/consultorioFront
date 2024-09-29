import gql from "graphql-tag";

const medicamentosQuery = gql`
query getMedicamentos($limit: Int!, $skip: Int!, $where: MedicamentoWhereInput) {
  getMedicamentos(limit: $limit, skip: $skip, where: $where) {
    edges {
      node {  
        ...Medicamento
      }
    }
    aggregate {
      count
    }
  }
}
`;
export default medicamentosQuery;
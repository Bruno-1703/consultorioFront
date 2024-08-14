import gql from "graphql-tag";

const citasQuery = gql`
query getCitas($limit: Int!, $skip: Int!, $where: CitaWhereInput) {
  getCitas(limit: $limit, skip: $skip,  where: $where) {
    edges {
      node {        
        id_cita
        observaciones
        cancelada       
  
      }
    }
    aggregate {
      count
   
    }
  }
}
`;
export default citasQuery;

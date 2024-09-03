import gql from "graphql-tag";

const citasQuery = gql`
query getCitas($limit: Int!, $skip: Int!, $where: CitaWhereInput) {
  getCitas(limit: $limit, skip: $skip,  where: $where) {
    edges {
      node {        
        observaciones
        cancelada    
        fechaSolicitud
        motivoConsulta 
        pacienteId
        medicamentos {
          id_medicamento
          nombre_med
        }
        enfermedades{
          id_enfermedad
          nombre_enf          
        }
  
  
      }
      
    }
    aggregate {
      count
   
    }
  }
}
`;
export default citasQuery;

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
        medicamentos {
          id_medicamento
          nombre_med
        }
        enfermedades{
          id_enfermedad
          nombre_enf          
        }
        paciente {
          id_paciente
          nombre_paciente
          dni          
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

import gql from "graphql-tag";

const citasQuery = gql`
query getCitas($limit: Int!, $skip: Int!, $where: CitaWhereInput) {
  getCitas(limit: $limit, skip: $skip,  where: $where) {
    edges {
      node {        
        observaciones
        cancelada    
        fechaSolicitud
        pacienteId
        motivoConsulta 
        enfermedades{
          nombre_enf
          id_enfermedad
        }
       medicamentos{
        id_medicamento
        nombre_med
      }
        paciente{
          dni
          id_paciente
          nombre_paciente
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

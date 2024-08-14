import gql from "graphql-tag";

export default gql`
    fragment Cita on Cita {
    id_cita  
    motivoConsulta 
    fechaSolicitud     
    observaciones
    cancelada,    
    medicamentos{
      id_medicamento
      nombre_med
      }
      enfermedades{
        id_enfermedad
        nombre_enf
      }  
   
  }
`;

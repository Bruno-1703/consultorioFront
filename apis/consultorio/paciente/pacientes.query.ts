import gql from "graphql-tag";

const pacientesQuery = gql`
query getPacientes($take: Int!, $skip: Int!, $where: PacienteWhereInput) {
  getPacientes(take: $take, skip: $skip,  where: $where) {
    edges {
      node { 
      id_paciente
      dni
      nombre_paciente
      apellido_paciente
      edad
      altura
      telefono
      fecha_nacimiento
      sexo
      grupo_sanguineo
      alergias      
     
  
      }
    }
    aggregate {
      count
   
    }
  }
}
`;
export default pacientesQuery;

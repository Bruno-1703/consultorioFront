import gql from "graphql-tag";

const pacientesQuery = gql`
query getPacientes($limit: Int!, $skip: Int!, $where: PacienteWhereInput) {
  getPacientes(limit: $limit, skip: $skip,  where: $where) {
    edges {
      node { 
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

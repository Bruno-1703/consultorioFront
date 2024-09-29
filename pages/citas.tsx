import * as React from 'react';
import CollapsibleCitaTable from '../components/citas/CollapsibleCitaTable';
import { useGetCitasQuery } from '../graphql/types';

const HistorialCitasPaciente: React.FC<{ pacienteId: string }> = ({ pacienteId }) => {
  const { data, loading, error, refetch } = useGetCitasQuery({
    variables: {
      limit: 10,
      skip: 0,
      where: {
        
      },
    },
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const citas = data?.getCitas.edges || [];

  return (
    <div>
      <h2>Historial de Citas del Paciente</h2>
      <CollapsibleCitaTable citas={citas} />
    </div>
  );
};

export default HistorialCitasPaciente;

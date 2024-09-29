import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Cita } from '../../graphql/types'; // Ajusta esta importación según tu esquema
import CitasRows from './CitasRows';

interface CollapsibleCitaTableProps {
  citas: any[];  // Array de citas del paciente
}

const CollapsibleCitaTable: React.FC<CollapsibleCitaTableProps> = ({ citas }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Motivo de Consulta</TableCell>
            <TableCell align="right">Fecha Solicitud</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {citas.map((cita) => (
            <CitasRows key={cita.id_cita} row={cita} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleCitaTable;

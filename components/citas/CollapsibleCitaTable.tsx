import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CitasRows from "./CitasRows";
// CollapsibleCitaTable.tsx

interface Cita {
  id_cita: string;
  motivoConsulta: string;
  fechaSolicitud: string; // O 'Date' si usas objetos de fecha
  estado: string; // Aquí puedes agregar más propiedades según lo que uses
}

interface CollapsibleCitaTableProps {
  citas: Cita[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const CollapsibleCitaTable: React.FC<CollapsibleCitaTableProps> = ({
  citas,
}) => {
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

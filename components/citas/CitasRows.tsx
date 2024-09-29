import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Cita } from '../../graphql/types'; // Ajusta esta importación según tu esquema

interface CitaRowProps {
  row: Cita;
}

const CitasRows: React.FC<CitaRowProps> = ({ row }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.motivoConsulta}
        </TableCell>
        <TableCell align="right">{row.fechaSolicitud}</TableCell>
        <TableCell align="right">{row.cancelada}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles de la Cita
              </Typography>
              <Table size="small" aria-label="detalles de la cita">
                <TableHead>
                  <TableRow>
                    <TableCell>Observaciones</TableCell>
                    <TableCell>Enfermedades</TableCell>
                    <TableCell>Medicamentos</TableCell>
                    <TableCell align="right">Cancelada</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.observaciones || 'N/A'}</TableCell>
                    <TableCell>
                      {row.enfermedades?.map((enf) => enf.nombre_enf).join(', ') || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {row.medicamentos?.map((med) => med.nombre_med).join(', ') || 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                      {row.cancelada ? 'Sí' : 'No'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default CitasRows;

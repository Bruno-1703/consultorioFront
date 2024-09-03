import * as React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Skeleton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Cita, useGetCitasQuery } from "../../graphql/types";
import TableSkeleton from "../../utils/TableSkeleton";
import { FormularioCita } from "./FormularioCita";

function Row({ row }: { row: Cita }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.motivoConsulta}</TableCell>
        <TableCell>{row.fechaSolicitud}</TableCell>
        <TableCell> N/A</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles
              </Typography>
              <Typography variant="body2">
                Observaciones: {row.observaciones || "No hay observaciones"}
              </Typography>
              <Typography variant="body2">
                Cancelada: {row.cancelada ? "Sí" : "No"}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Datos del Paciente:
                <Typography variant="body2">
                 DNI: {row?.paciente?.dni || "N/A"}
                </Typography>
                <Typography variant="body2">
                 Nombre: {row?.paciente?.nombre_paciente || "N/A"}
                </Typography>
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTable() {
  const { data, loading, error } = useGetCitasQuery({
    variables: {
      limit: 10,
      skip: 0,
      where: {},
    },
  });
  if (loading) return <TableSkeleton rows={3} columns={5} />;
  if (error) return <p>Error: {error.message}</p>;
  const citas = data?.getCitas.edges || [];
  console.log(data)
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <FormularioCita />
      <TableContainer
        component={Paper}
        sx={{ width: "100%", flexGrow: 1, overflow: "auto" }}
      >
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Motivo Consulta</TableCell>
              <TableCell>Fecha Solicitud</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citas.map((items, index) => (
              <Row
                key={index}
                row={{
                  motivoConsulta: items.node.motivoConsulta || "N/A",
                  fechaSolicitud: items.node.fechaSolicitud || "N/A",
                  observaciones: items.node.observaciones || "N/A",
                  cancelada: items.node.cancelada,
                  enfermedades: items.node.enfermedades,
                  medicamentos: items.node.medicamentos,
                }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

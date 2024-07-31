import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Tipo para una Cita
interface Cita {
  id_cita: string;
  motivoConsulta: string;
  fechaSolicitud: string;
  fechaModificacion?: string;
  observaciones?: string;
  cancelada: boolean;
  enfermedad: {
    id_enfermedad: string;
    nombre_enf: string;
    fecha: string;
  }[];
  medicamento: {
    id_medicamento: string;
    nombre_med?: string;
  }[];
  estudio: {
    id_estudio: string;
    fecha_realizacion: string;
    codigo_referencia: string;
  }[];
}

// Datos de ejemplo
const citas: Cita[] = [
  {
    id_cita: "1",
    motivoConsulta: "Consulta general",
    fechaSolicitud: "2024-08-01",
    fechaModificacion: "2024-08-02",
    observaciones: "Ninguna",
    cancelada: false,
    enfermedad: [
      { id_enfermedad: "enf1", nombre_enf: "Gripe", fecha: "2024-08-01" },
    ],
    medicamento: [{ id_medicamento: "med1", nombre_med: "Paracetamol" }],
    estudio: [
      {
        id_estudio: "est1",
        fecha_realizacion: "2024-08-01",
        codigo_referencia: "A123",
      },
    ],
  },
  // Otros registros de ejemplo
];

function Row(props: { row: Cita }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: open ? "#f5f5f5" : "inherit", // Alterna el color de fondo
          "&:hover": {
            backgroundColor: "#e0e0e0", // Color de fondo en hover
          },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              // Estilos para el IconButton
              padding: 1,
              borderRadius: "50%",
              border: "1px solid #ccc",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.motivoConsulta}
        </TableCell>
        <TableCell>{row.fechaSolicitud}</TableCell>
        <TableCell>{row.cancelada ? "Sí" : "No"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles de la Cita
              </Typography>
              <Typography variant="body2">
                {`Motivo: ${row.motivoConsulta}`}
              </Typography>
              <Typography variant="body2">
                {`Observaciones: ${row.observaciones || "Ninguna"}`}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Enfermedades
              </Typography>
              {row.enfermedad.length > 0 ? (
                row.enfermedad.map((enf) => (
                  <Typography key={enf.id_enfermedad} variant="body2">
                    {`Nombre: ${enf.nombre_enf}, Fecha: ${enf.fecha}`}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">
                  No hay enfermedades relacionadas.
                </Typography>
              )}
              <Typography variant="h6" gutterBottom component="div">
                Medicamentos
              </Typography>
              {row.medicamento.length > 0 ? (
                row.medicamento.map((med) => (
                  <Typography key={med.id_medicamento} variant="body2">
                    {`Nombre: ${med.nombre_med || "Sin nombre"}`}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">
                  No hay medicamentos relacionados.
                </Typography>
              )}
              <Typography variant="h6" gutterBottom component="div">
                Estudios
              </Typography>
              {row.estudio.length > 0 ? (
                row.estudio.map((est) => (
                  <Typography key={est.id_estudio} variant="body2">
                    {`Fecha: ${est.fecha_realizacion}, Código: ${est.codigo_referencia}`}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">
                  No hay estudios relacionados.
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh", // Ocupa toda la altura de la ventana
        display: "flex",
        flexDirection: "column",
        padding: 2, // Añade un padding para separar la tabla de los bordes de la pantalla
      }}
    >
         <TableContainer component={Paper} sx={{ width: "100%", flexGrow: 1, overflow: "auto" }}>

        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Motivo Consulta</TableCell>
              <TableCell>Fecha Solicitud</TableCell>
              <TableCell>Cancelada</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citas.map((cita) => (
              <Row key={cita.id_cita} row={cita} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

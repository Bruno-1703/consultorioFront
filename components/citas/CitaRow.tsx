import { Box, Collapse, IconButton, TableCell, Typography } from "@mui/material";
import { TableRow } from "@mui/material";
import { Cita } from "../../graphql/types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";

export const CitaRow: React.FC<{ row: Cita }> = ({ row }) => {
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
          <TableCell>{row.cancelada ? "Cancelada" : "Pendiente "}</TableCell>
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
  };
  
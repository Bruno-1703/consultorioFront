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
  TextField,
  TablePagination,
  Button,
  Badge,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import ListIcon from "@mui/icons-material/List"; // Reemplaza por el ícono que prefieras
import SearchIcon from "@mui/icons-material/Search";
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
}

export default function CollapsibleTable() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showForm, setShowForm] = React.useState(false);

  const { data, loading, error, refetch } = useGetCitasQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      // where: searchTerm ? { motivoConsulta: { contains: searchTerm } } : {},
    },
  });

  if (loading) return <TableSkeleton rows={3} columns={5} />;
  if (error) return <p>Error: {error.message}</p>;

  const citas = data?.getCitas.edges || [];
  const totalCount = data?.getCitas.aggregate.count || 0;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page when search term changes
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page when rows per page changes
  };

  const handleRefresh = () => {
    refetch(); // Refresh the data
  };

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
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setShowForm(!showForm)}
          sx={{ mr: 2 }}
        >
          {showForm ? "Cancelar" : "Agregar Cita"}
        </Button>
        {showForm && <FormularioCita />}
        <TextField
          label="Buscar por Motivo de Consulta"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginRight: 2 }}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
        <IconButton
          aria-label="refresh"
          onClick={handleRefresh}
          sx={{ mr: 2 }}
        >
          <RefreshIcon />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Badge badgeContent={totalCount} color="primary">
            <ListIcon />
          </Badge>
        </Box>
      </Box>

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
                  paciente: items.node.paciente,
                }}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

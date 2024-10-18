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
import RefreshIcon from "@mui/icons-material/Refresh";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import { Cita, useGetCitasQuery } from "../../graphql/types";
import TableSkeleton from "../../utils/TableSkeleton";
import { FormularioCita } from "./FormularioCita";
import { CitaRow } from "./CitaRow";
import dayjs from "dayjs";

interface CollapsibleTableProps {
  fecha: dayjs.Dayjs;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({ fecha }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { data, loading, error, refetch } = useGetCitasQuery({
    variables: {
      limit: rowsPerPage,
      skip: page * rowsPerPage,
      where: {
        fechaSolicitud: fecha,
        motivoConsulta: searchTerm || undefined,
      },
    },
  });

  if (loading) return <TableSkeleton rows={3} columns={5} />;
  if (error) return <p>Error: {error.message}</p>;

  const citas = data?.getCitas.edges || [];
  const totalCount = data?.getCitas.aggregate.count || 0;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefresh = () => {
    refetch();
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
      {/* Barra de búsqueda y contador */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        {/* Búsqueda */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Buscar por Motivo de Consulta"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ marginRight: 2, width: '300px' }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <IconButton onClick={handleRefresh} sx={{ marginLeft: 1 }}>
            <RefreshIcon />
          </IconButton>
        </Box>

        {/* Contador */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ marginRight: 1 }}>
            Total de Citas:
          </Typography>
          <Badge badgeContent={totalCount} color="primary">
            <ListIcon />
          </Badge>
        </Box>
      </Box>

      {/* Tabla de citas */}
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
              <CitaRow
                key={index}
                row={{
                  id_cita: items.node.id_cita,
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

      {/* Paginación */}
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
};

export default CollapsibleTable;

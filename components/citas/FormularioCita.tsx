import {
  Box,
  Button,
  Collapse,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import {
  CitaInput,
  PacienteInput,
  useCreateCitaMutation,
  useGetPacientesQuery,
} from "../../graphql/types";

export const FormularioCita = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState("");
  const {
    data: pacientesData,
    loading: pacientesLoading,
    error: pacientesError,
  } = useGetPacientesQuery({
    variables: {
      limit: 10,
      skip: 0,
      where: {},
    },
  });

  console.log(pacientesData);

  const [createCitaMutation, { loading, error }] = useCreateCitaMutation();

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const citaForm: CitaInput = {
        motivoConsulta,
        observaciones,
      };
      const pacienteForm: PacienteInput = {
        // id: selectedPaciente, // Asumimos que el ID es el identificador único
        //dni:
        //nombre_paciente:
      };

      await createCitaMutation({
        variables: { data: citaForm, paciente: pacienteForm },
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Button
        onClick={toggleForm}
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ marginBottom: 2 }}
      >
        Añadir Cita
      </Button>

      <Collapse in={isFormOpen}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2 }}
        >
          <Typography variant="h6" gutterBottom>
            Formulario de Cita
          </Typography>

          <TextField
            label="Motivo de Consulta"
            name="motivoConsulta"
            fullWidth
            margin="normal"
            value={motivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
          />

          <TextField
            label="Fecha y Hora"
            type="datetime-local"
            name="fechaHora"
            fullWidth
            margin="normal"
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Observaciones"
            name="observaciones"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="paciente-label">Seleccionar Paciente</InputLabel>
            <Select
              labelId="paciente-label"
              id="paciente"
              value={selectedPaciente}
              onChange={(e) => setSelectedPaciente(e.target.value as string)}
              label="Seleccionar Paciente"
              disabled={pacientesLoading || !!pacientesError}
            >
              {pacientesData?.getPacientes.edges.map(({ node }: any) => (
                <MenuItem key={node.id} value={node.id}>
                  {node.nombre}{" "}
                  {/* Ajusta esto según los campos de tu modelo */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>

          {error && (
            <Typography color="error">
              Error al enviar: {error.message}
            </Typography>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

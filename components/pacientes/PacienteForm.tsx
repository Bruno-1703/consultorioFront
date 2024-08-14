import React, { useState } from "react";
import { TextField, Button, Box, Collapse } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function PacienteForm() {
  const [openForm, setOpenForm] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para manejar el envío del formulario
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(!openForm)}
        sx={{ marginBottom: 2 }}
      >
        {openForm ? "Cerrar Formulario" : "Agregar Paciente"}
      </Button>
      <Collapse in={openForm}>
        <form onSubmit={handleSubmit}>
          <TextField label="DNI" name="dni" fullWidth margin="normal" />
          <TextField
            label="Nombre"
            name="nombrePaciente"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Apellido"
            name="apellidoPaciente"
            fullWidth
            margin="normal"
          />
          <TextField label="Edad" name="edad" fullWidth margin="normal" />
          <TextField label="Altura" name="altura" fullWidth margin="normal" />
          <TextField label="Teléfono" name="telefono" fullWidth margin="normal" />
          <TextField
            label="Fecha de Nacimiento"
            name="fechaNacimiento"
            fullWidth
            margin="normal"
          />
          <TextField label="Sexo" name="sexo" fullWidth margin="normal" />
          <TextField
            label="Grupo Sanguíneo"
            name="grupoSanguineo"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Alergias"
            name="alergias"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </form>
      </Collapse>
    </Box>
  );
}

import React from 'react';
import { TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function EstudioForm() {
  const [fechaRealizacion, setFechaRealizacion] = React.useState(new Date());

  return (
    <form onSubmit={handleSubmit}>
      {/* <DatePicker
        label="Fecha de Realización"
        value={fechaRealizacion}
        onChange={(newValue) => setFechaRealizacion(newValue)}
        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
      /> */}

      <TextField
        label="Tipo de Estudio"
        name="tipoEstudio"
        fullWidth
        margin="normal"
      />

      <TextField
        label="Resultado"
        name="resultado"
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Código de Referencia"
        name="codigoReferencia"
        fullWidth
        margin="normal"
      />

      <TextField
        label="Observaciones"
        name="observaciones"
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Médico Solicitante"
        name="medicoSolicitante"
        fullWidth
        margin="normal"
      />

      <FormControlLabel
        control={<Checkbox name="urgente" />}
        label="Urgente"
      />

      <Button type="submit" variant="contained" color="primary">
        Guardar
      </Button>
    </form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    // lógica para manejar el envío del formulario
  }
}

export default EstudioForm;

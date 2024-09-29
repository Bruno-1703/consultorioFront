import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import TextField from "@mui/material/TextField/TextField";
import React from "react";

export const EstudioForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tipoEstudio, setTipoEstudio] = React.useState('');
  const [resultado, setResultado] = React.useState('');
  const [codigoReferencia, setCodigoReferencia] = React.useState('');
  const [urgente, setUrgente] = React.useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar los datos del formulario
    console.log({ tipoEstudio, resultado, codigoReferencia, urgente });
    onClose(); // Cerrar el formulario después de enviar
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <TextField
        label="Tipo de Estudio"
        variant="outlined"
        fullWidth
        value={tipoEstudio}
        onChange={(e) => setTipoEstudio(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Resultado"
        variant="outlined"
        fullWidth
        value={resultado}
        onChange={(e) => setResultado(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Código de Referencia"
        variant="outlined"
        fullWidth
        value={codigoReferencia}
        onChange={(e) => setCodigoReferencia(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={urgente}
            onChange={(e) => setUrgente(e.target.checked)}
          />
        }
        label="Urgente"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}>
        Registrar
      </Button>
      <Button variant="outlined" onClick={onClose}>
        Cancelar
      </Button>
    </Box>
  );
};

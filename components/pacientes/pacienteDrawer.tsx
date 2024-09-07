import * as React from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  Card, 
  CardContent 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PacientesDrawer = ({ drawerOpen, handleCloseDrawer, selectedPaciente }) => {
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleCloseDrawer}
      PaperProps={{
        sx: {
          width: 400,
          padding: 3,
          backgroundColor: '#1e1e1e', // Fondo oscuro
          color: '#e0e0e0', // Texto claro
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', // Sombra elegante
          borderRadius: '8px 0 0 8px', // Bordes suaves en el drawer
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#90caf9' }}>
          Detalles del Paciente
        </Typography>
        <IconButton onClick={handleCloseDrawer} sx={{ color: '#f44336' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {selectedPaciente && (
        <Card
          sx={{
            backgroundColor: '#2b2b2b',
            color: '#e0e0e0',
            borderRadius: 2,
            padding: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            marginTop: 2,
          }}
        >
          <CardContent>
            <Typography variant="body1" sx={{ color: '#90caf9' }}>
              <strong>ID Paciente:</strong> {selectedPaciente.id_paciente || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>DNI:</strong> {selectedPaciente.dni || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Nombre:</strong> {selectedPaciente.nombre_paciente || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Apellido:</strong> {selectedPaciente.apellido_paciente || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Edad:</strong> {selectedPaciente.edad || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Altura:</strong> {selectedPaciente.altura ? `${selectedPaciente.altura} cm` : 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Teléfono:</strong> {selectedPaciente.telefono || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Fecha de Nacimiento:</strong> {selectedPaciente.fecha_nacimiento ? new Date(selectedPaciente.fecha_nacimiento).toLocaleDateString() : 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Sexo:</strong> {selectedPaciente.sexo || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Grupo Sanguíneo:</strong> {selectedPaciente.grupo_sanguineo || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Alergias:</strong> {selectedPaciente.alergias || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Drawer>
  );
};

export default PacientesDrawer;

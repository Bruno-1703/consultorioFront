import * as React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Card, 
  CardContent, 
  Modal 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PacientesModal = ({ modalOpen, handleCloseModal, selectedPaciente }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 725,  // Más ancho para mejor legibilidad
          background: '#1e1e1e',  // Fondo oscuro
          color: '#e0e0e0',  // Texto claro
          padding: 4,
          borderRadius: '16px',  // Bordes suavizados
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',  // Sombras más sutiles
          border: '1px solid rgba(144, 202, 249, 0.3)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            id="modal-title" 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              color: '#90caf9', 
            }}
          >
            Detalles del Paciente
          </Typography>
          <IconButton 
            onClick={handleCloseModal} 
            sx={{ 
              color: '#ff1744', 
              '&:hover': { background: '#ff1744', color: '#fff' } 
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {selectedPaciente && (
          <Card
            sx={{
              backgroundColor: '#2b2b2b',
              color: '#e0e0e0',
              borderRadius: '12px',
              padding: 3,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              marginTop: 2,
            }}
          >
            <CardContent>
              {[
                { label: 'ID Paciente', value: selectedPaciente.id_paciente },
                { label: 'DNI', value: selectedPaciente.dni },
                { label: 'Nombre', value: selectedPaciente.nombre_paciente },
                { label: 'Apellido', value: selectedPaciente.apellido_paciente },
                { label: 'Edad', value: selectedPaciente.edad },
                { label: 'Altura', value: selectedPaciente.altura ? `${selectedPaciente.altura} cm` : 'N/A' },
                { label: 'Teléfono', value: selectedPaciente.telefono },
                { label: 'Fecha de Nacimiento', value: selectedPaciente.fecha_nacimiento ? new Date(selectedPaciente.fecha_nacimiento).toLocaleDateString() : 'N/A' },
                { label: 'Sexo', value: selectedPaciente.sexo },
                { label: 'Grupo Sanguíneo', value: selectedPaciente.grupo_sanguineo },
                { label: 'Alergias', value: selectedPaciente.alergias },
              ].map((field, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    color: '#90caf9',
                    marginTop: index > 0 ? 1 : 0,
                  }}
                >
                  <strong>{field.label}:</strong> {field.value || 'N/A'}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}
      </Box>
    </Modal>
  );
};

export default PacientesModal;

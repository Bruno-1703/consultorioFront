import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EnfermedadesDrawer = ({ drawerOpen, handleCloseDrawer, selectedEnfermedad }) => {
  return (
    <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
      <Box
        sx={{
          width: 400,
          p: 3,
          backgroundColor: "#f5f5f5",
          height: "100%",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Detalles de la Enfermedad
          </Typography>
          <IconButton onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 2 }} />
        {selectedEnfermedad ? (
          <Stack spacing={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Nombre:
            </Typography>
            <Typography>{selectedEnfermedad.nombre_enf}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Síntomas:
            </Typography>
            <Typography>{selectedEnfermedad.sintomas}</Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Gravedad:
            </Typography>
            <Typography>{selectedEnfermedad.gravedad}</Typography>
          </Stack>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Seleccione una enfermedad para ver los detalles.
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default EnfermedadesDrawer;

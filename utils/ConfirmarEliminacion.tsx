import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from '@mui/material';

const useStyles = () => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: '16px',
    },
  },
});

interface ConfirmarEliminacionProps {
  open: boolean; // Propiedad para controlar la visibilidad
  item?: any;
  onConfirmar: (item: any) => void;
  onClose: () => void;
  mensaje: string;
  titulo?: string;
  disable: boolean;
}

const ConfirmarEliminacion: React.FC<ConfirmarEliminacionProps> = ({
  open,
  item,
  mensaje,
  titulo = 'Confirmación',
  onConfirmar,
  onClose,
  disable,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open} // Utiliza la prop open para controlar la visibilidad
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {mensaje}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      {disable ? (
  <div style={classes.root}>
    <LinearProgress color="secondary" />
  </div>
) : (
  <>
    <Button onClick={onClose} color="secondary">
      Cancelar
    </Button>
    <Button
      onClick={() => onConfirmar(item)}
      color="primary"
      autoFocus
      disabled={disable}
    >
      Confirmar
    </Button>
  </>
)}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmarEliminacion;

import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  dialogTitle,
  dialogContent,
  showCancelButton = true,
  showConfirmButton = true,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {showCancelButton && (
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        )}
        {showConfirmButton && (
          <Button onClick={onConfirm} color="primary">
            OK
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

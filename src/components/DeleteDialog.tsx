import { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SnackbarContext } from '../context';
import { Severity } from '../types';
import { SecondaryButton } from './SecondaryButton';

export function DeleteDialog({open, setOpen, deleteDevice}: any) {
  const openSnackbar = useContext(SnackbarContext)

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteDevice()
      handleClose()
      openSnackbar({open: true, severity: Severity.SUCCESS, text: 'successfully deleted device'});
    } catch (error) {
      handleClose()
      openSnackbar({open: true, severity: Severity.ERROR, text: 'failed to delete device'});
    }

  } 

  return (
    <div>
      <Dialog
      className="p-4"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="text-gray-700" id="alert-dialog-title">{"Really want to delete the device?"}</DialogTitle>
        <DialogActions>
          <SecondaryButton onClick={handleClose} autoFocus>
            cancel
          </SecondaryButton>
          <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-10 rounded shadow outline-none">
            delete
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
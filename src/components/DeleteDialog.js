import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteDialog({open, setOpen, deleteSensor}) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteSensor()
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
          <button onClick={handleClose} className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow" autoFocus>
            cancel
          </button>
          <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-10 rounded shadow outline-none">
            delete
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
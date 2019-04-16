import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function HelpModal(props) {
  return (
    <Dialog onClose={ props.onClose } open={ props.open }>
      <DialogTitle>Help</DialogTitle>
    </Dialog>
  );
}

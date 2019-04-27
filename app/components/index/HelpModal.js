import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

HelpModal.defaultProps = {
  onClose: () => {},
  open: false
};

HelpModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

/**
 * HelpModal component
 *
 * A help modal providing help on how to use ScoutKit
 */
export default function HelpModal(props) {
  const { onClose, open } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Help</DialogTitle>
    </Dialog>
  );
}

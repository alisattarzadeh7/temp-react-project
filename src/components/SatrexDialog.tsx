import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { SatrexDialogProps } from '../utils/interfaces';

const SatrexDialog:React.FC<SatrexDialogProps> = ({
 content, open, handleClose, otherProps,
}) => (
  <>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...otherProps}
    >
      <DialogContent>
        {content}
      </DialogContent>
    </Dialog>

  </>
);
export default SatrexDialog;

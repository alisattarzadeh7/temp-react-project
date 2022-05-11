import { useState } from 'react';
import { useSatrexDialogReturnType } from '../utils/interfaces';

const useSatrexDialog: () => useSatrexDialogReturnType = (): useSatrexDialogReturnType => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open);
    };

    return {
        open,
        setOpen,
        handleClose,
    };
};

export default useSatrexDialog;

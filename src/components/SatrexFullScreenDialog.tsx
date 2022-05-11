import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useImperativeHandle } from 'react';
import { SatrexFullScreenDialogProps } from '../utils/interfaces';
import { satrexGreen } from '../styles/colors';
import Trans from './Trans';

const Transition = React.forwardRef((
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

const SatrexFullScreenDialog : React.FC<SatrexFullScreenDialogProps> = ({ title, children }, ref) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => { setOpen(false); };

    useImperativeHandle(ref, () => ({
        handleClickOpen: () => { setOpen(true); },
        handleClose,
    }));

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: satrexGreen }}>
                    <Toolbar>

                        <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant="h6" component="div">
                            <Trans>{title}</Trans>
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            style={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {
                    children
                }
            </Dialog>
        </div>
    );
};

// @ts-ignore
export default React.forwardRef(SatrexFullScreenDialog);

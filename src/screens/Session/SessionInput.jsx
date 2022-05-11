import React from 'react';
import { makeStyles } from '@mui/styles';
import { Input } from '@mui/material';
import { satrexGreen, satrexGray } from '../../styles/colors';

const useStyles = makeStyles({
    root: {
        width: '100%',
        '& input': {
            color: 'white',
            textAlign: 'center',
            minHeight: 20,
            fontSize: 14,
            '&::placeholder': {
                fontSize: 13,
            },
        },
            '&:after': {
                borderBottom: `2px solid ${satrexGreen} !important`,
            },
            '&:before': {
                borderBottom: `1px solid ${satrexGray}`,
            },
            '&:hover': {
                borderBottom: `1px solid ${satrexGray} !important`,
            },
        '& ::placeholder': {
            color: 'white',
        },
    },

});

const SessionInput = (props) => {
    const classes = useStyles();

    return (
        <>
            <Input
                id="standard-basic"
                variant="standard"
                {...props}
                className={`${classes.root} ${props.className} sessionInputStyle`}
            />
        </>
    );
};
export default SessionInput;

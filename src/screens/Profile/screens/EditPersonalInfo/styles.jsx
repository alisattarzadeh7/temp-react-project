import { makeStyles } from '@mui/styles';
import { satrexGreen } from '../../../../styles/colors';

export default makeStyles({
    tabRoot: {
        minHeight: '9px !important',
        minWidth: 'fit-content',
        padding: 10,
    },
    tabsFixed: {
        height: '40px !important',
        direction: 'rtl',
        overflow: 'auto !important',
    },
    indicatorClass: {
        backgroundColor: `${satrexGreen} !important`,
    },
    selectedTab: {
        '& label': {
            color: satrexGreen,
        },
    },
    tabsRoot: {
        width: '100%',
        direction: 'rtl',
    },
});

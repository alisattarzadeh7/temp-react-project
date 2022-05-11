import { makeStyles } from '@mui/styles';

export default makeStyles({
  dropzoneStyles1: {
    backgroundColor: 'white',
    background: (props) => `url(${props.nationalCardPreview})`,
    backgroundSize: 'contain !important',
    backgroundRepeat: 'no-repeat !important',
    transition: '0.3s',
    '&:hover': {
      filter: (props) => (props.disabled ? 'unset' : 'brightness(50%)'),
    },
    borderRadius: '10px !important',
    width: 400,
    height: '50px !important',
    minHeight: '50px !important',
    backgroundPosition: 'center !important',
    animation: 'unset !important',
  },
  dropzoneStyles2: {
    backgroundColor: 'white',
    background: (props) => `url(${props.personalImagePreview})`,
    backgroundSize: 'contain !important',
    backgroundRepeat: 'no-repeat !important',

    transition: '0.3s',
    '&:hover': {
      filter: (props) => (props.disabled ? 'unset' : 'brightness(50%)'),
    },
    borderRadius: '10px !important',
    width: 400,
    height: '50px !important',
    minHeight: '50px !important',
    backgroundPosition: 'center !important',
    animation: 'unset !important',
  },
  dropzoneIconStyle: {
    fontSize: '75px !important',
    marginTop: '70px',
    color: 'red',
  },
});

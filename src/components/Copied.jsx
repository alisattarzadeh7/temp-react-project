import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { Popover } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Trans from './Trans';
import { satrexGreen } from '../styles/colors';

const useStyles = makeStyles({
  paperStyle: {
    overflow: 'hidden',
  },

});

const Copied = ({ text }) => {
  const classes = useStyles();
  const [popOverAnchorEl, setPopOverAnchorEl] = useState(null);
  const popOverOpen = Boolean(popOverAnchorEl);
  const popOverId = popOverOpen ? 'simple-popover' : undefined;
  const lang = useSelector((state) => state.user.language);
  const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';

  const handlePopOverClick = (event) => {
    if (text) {
      setPopOverAnchorEl(event.currentTarget);
      setTimeout(() => {
        setPopOverAnchorEl(null);
      }, 1500);
    }
  };

  const handlePopOverClose = () => {
    setPopOverAnchorEl(null);
  };

  return (
    <>
      <CopyToClipboard text={text}>
        <IconButton
          id={popOverId}
          style={{
            cursor: 'pointer !important',
            position: 'relative',
            top: '-5px',
          }}
          onClick={handlePopOverClick}
        >
          <FileCopyOutlinedIcon />
        </IconButton>
      </CopyToClipboard>
      <Popover
        id={popOverId}
        open={popOverOpen}
        anchorEl={popOverAnchorEl}
        onClose={handlePopOverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: classes.paperStyle,
        }}
        style={{ overflow: 'hidden' }}
      >
                      <span
                        style={{
                          padding: '15px',
                          fontFamily: 'YekanBakh-Medium !important',
                          color: satrexGreen,
                        }}
                      >
                        <Trans>copied</Trans>
                      </span>
      </Popover>

    </>
  );
};
export default Copied;

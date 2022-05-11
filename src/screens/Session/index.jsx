import React, { useEffect, useRef, useState } from 'react';
import '../../styles/chart.scss';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { motion } from 'framer-motion';
import Candles from '../../components/Candles';
import 'animate.css';
import topShadow from '../../images/loginComponent/topShadow.svg';
import bottomShadow from '../../images/loginComponent/bottomShadow.svg';
import logoText from '../../images/loginComponent/logoText.svg';
import window from '../../images/loginComponent/window.svg';
import Login from './Login';
import Register from './Register';
import Trans from '../../components/Trans';
import LanguageSelection from '../Settings/LanguageSelection';
import { cleanRedirects } from '../../redux/actions/LayoutActions';
import ResetPassword from './ResetPassword';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ routeName }) => {
  const candleRows = Array.from(Array(parseInt(document.body.clientWidth / 21 * 2.1)).keys());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [showFaded, setShowFaded] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);
  const [contentReady, setContentReady] = useState(0);
  const [keyboardUp, setKeyboardUp] = useState(false);
  const [footerLinks, setFooterLinks] = useState(<></>);
  const language = useSelector((state) => state.layout.language);
  const [pushTop, setPushTop] = useState(0);
  const isLtr = language === 'EN';
  const formRef = useRef();

  useEffect(() => {
      let isMounted = true;
      if (isMounted) {
          setTimeout(() => {
              setPushTop(7000 / document.getElementById('sessionForm') ? document.getElementById('sessionForm').getBoundingClientRect().top : 1);
          }, 400);
      }
      return () => {
          isMounted = false;
      };
  }, [keyboardUp]);

  if (!mounted) {
    setTimeout(() => {
      setShowFaded(true);
    }, 1000);
    setTimeout(() => {
      setAppLoaded(true);
      setContentReady(1);
    }, 3000);
  }
  useEffect(() => {
      let isMounted = true;
      if (isMounted) {
          setMounted(true);
          dispatch(cleanRedirects());
      }
      return () => {
          isMounted = false;
      };
  }, []);
  // console.log('formRef : ', document.getElementById('sessionForm').getBoundingClientRect().top);
  return (
    <div style={{
      background: '#030f2e', height: '100%', width: '100%', overflow: 'hidden', display: 'block',
    }}
    >
      <div
        className="row animate__animated animate__fadeIn"
        style={{
          height: '100%',
          flexDirection: 'row',
          transition: '0.3s',
          transitionTimingFunction: 'cubic-bezier(0,.49,.64,1.07)',
        }}
      >
        <div style={{
          width: '100%',
          flexDirection: 'row',
          transition: '0.3s',
          display: 'flex',
          height: '100%',
          marginTop: !appLoaded ? ((document.documentElement.clientHeight + 400) / 2) - 400 : (keyboardUp ? -pushTop : 0),
        }}
        >
          <div style={{ width: '65%', direction: 'ltr', marginTop: '-30%' }} className="topShadowDiv">
            <img src={topShadow} alt="" />
          </div>
          <motion.div
            className="row"
            style={{
              marginTop: '20%', width: '17%', zIndex: 6, alignItems: 'baseline', flexDirection: 'row',
            }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1 }}
            animate={{ opacity: 1 }}
          >
            <img src={logoText} className="logoText" alt="" />
            <img src={window} className="window" alt="" />
          </motion.div>

          <div style={{ width: '18%' }} className="bottomShadowDiv">
            <img src={bottomShadow} alt="" />
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '0px',
            zIndex: 4,
            width: !showFaded ? '79.5%' : '0%',
            height: '100%',
            backgroundColor: '#030f2e',
            transition: '1.5s',
            left: '20.5%',

          }}

        />
        <div
          style={{
            position: 'absolute',
            zIndex: 4,
            width: !showFaded ? '20.5%' : '0%',
            height: '100%',
            backgroundColor: '#030f2e',
            transition: '1.5s',
            right: '79.5%',
          }}

        />
        <div className="sessionContent" style={{ opacity: contentReady }}>
          <div style={{ width: '100%' }} id="sessionForm">
            {routeName === 'login' && <Login setKeyboardUp={setKeyboardUp} setFooterLinks={setFooterLinks} />}
            {routeName === 'register' && <Register setKeyboardUp={setKeyboardUp} setFooterLinks={setFooterLinks} />}
            {routeName === 'reset-password' && <ResetPassword setKeyboardUp={setKeyboardUp} setFooterLinks={setFooterLinks} />}
          </div>
        </div>
        <div className="footerCandle" style={{ opacity: keyboardUp ? 0 : 1, transition: '0.3s' }}>
          <div className="candlesDiv" />
          <div className="mainCandlesDiv" style={{ overflow: 'hidden' }}>
            <div
              className="row"
              style={{
                direction: 'ltr', justifyContent: 'initial', height: 168, flexDirection: 'row',
              }}
            >
              {
                candleRows.map((item, index) => <Candles key={item} index={index} part={1} />)
              }
            </div>
          </div>
        </div>
        {
          !keyboardUp
          && (
            <>

              <div className="candleShadow" style={{ position: 'absolute', bottom: '0px', height: 300 }} />
              <div style={{
                position: 'absolute', bottom: 80, zIndex: 20, width: '100%', opacity: contentReady,
              }}
              >
                {footerLinks}
              </div>
            </>
          )
        }
      </div>

      {
        appLoaded
        && (
          <Button
            variant="outlined"
            className="animate__animated animate__fadeIn"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            style={{
              fontSize: 12,
              position: 'absolute',
              top: 10,
              left: isLtr ? 'unset' : 10,
              right: isLtr ? 10 : 'unset',
              color: 'rgb(182 182 182)',
              borderColor: 'transparent',
            }}
            endIcon={(
              <>
                &nbsp;&nbsp;
                <KeyboardArrowDownIcon style={{ color: 'rgb(182 182 182)', marginLeft: 0 }} />
              </>
            )}
          >
            <Trans>{language}</Trans>
          </Button>
        )
      }
      <LanguageSelection
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </div>
  );
};

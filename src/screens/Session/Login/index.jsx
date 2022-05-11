import React, { useEffect, useState } from 'react';
import { IonButton, IonLoading, useIonToast } from '@ionic/react';
import { useHistory } from 'react-router';
import InputMask from 'react-input-mask';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import SessionInput from '../SessionInput';
import { satrexSemiGray } from '../../../styles/colors';
import { loginWithPhoneAndPassword } from '../../../utils/apis';
import Trans, { transFn } from '../../../components/Trans';

export default ({ setKeyboardUp, setFooterLinks }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState();

  const [present, dismiss] = useIonToast();
  const history = useHistory();

  const handleRedirection = (historyParam) => {
    setTimeout(() => {
      history.replace(historyParam);
      setShowLoading(false);
    }, 1000);
  };

  const handleLogin = async () => {
    setShowLoading(true);
    const res = await loginWithPhoneAndPassword(mobile, password);
    if (res) {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        const firstInitialization = localStorage.getItem('firstInitialization');
        if (firstInitialization) {
          handleRedirection('/home');
        } else {
          handleRedirection('/intro');
          localStorage.setItem('firstInitialization', 'true');
        }
      } else {
        handleRedirection('/home');
      }
    }
    setShowLoading(false);
  };

  useEffect(() => {
      let isMounted = true;
      if (isMounted) {
          setFooterLinks(<p
              style={{ color: 'white', textAlign: 'center', cursor: 'pointer' }}
              onClick={() => history.push('/register')}
          >
              <Trans>RegisterAtSatrex</Trans>
                         </p>);
      }
      return () => {
          isMounted = false;
      };
  }, []);

  return (
    <div className="animate__animated animate__fadeIn" style={{ direction: 'ltr', width: '100%', marginTop: 20 }}>
      <div className="divInput">
        <InputMask
          value={mobile}
          onFocus={() => setKeyboardUp(true)}
          onBlur={() => setKeyboardUp(false)}
          onChange={(e) => setMobile(e.target.value)}
          maskChar=""
          placeholder={transFn('mobile')}
          mask="+98 **********"
          formatChars={{ '*': '[A-Za-z0-9]' }}
        >
          {(inputProps) => (
            <SessionInput
              {...inputProps}
            />
          )}

        </InputMask>
      </div>
      <div className="divInput">
        <SessionInput
          value={password}
          onFocus={() => setKeyboardUp(true)}
          onBlur={() => setKeyboardUp(false)}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={transFn('password')}
          type={showPassword ? 'text' : 'password'}
          endAdornment={(
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff style={{ color: satrexSemiGray, fontSize: 13 }} />
                  : <Visibility style={{ color: satrexSemiGray, fontSize: 13 }} />}
              </IconButton>
            </InputAdornment>
          )}

        />
      </div>
      <div style={{ height: 60 }}>
        <IonButton
          className="sessionButton"
          style={{ margin: 0 }}
          onClick={handleLogin}
        >
          <Trans>Login</Trans>
        </IonButton>
      </div>
      <div style={{ color: 'white' }}>
        <p style={{ fontSize: 12, textAlign: 'center' }} onClick={() => history.push('/reset-password')}><Trans>forgotPassword</Trans></p>
      </div>
      <IonLoading
        // cssClass='my-custom-class'
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={transFn('please wait...')}
        spinner="lines"
      />

    </div>
  );
};

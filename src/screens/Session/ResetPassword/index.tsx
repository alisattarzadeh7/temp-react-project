import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonLoading } from '@ionic/react';
import { useHistory } from 'react-router';
import InputMask from 'react-input-mask';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SessionInput from '../SessionInput';
import {
  loginWithPhoneAndPassword, resetPassword, sendSmsCodeByNumber,
} from '../../../utils/apis';
import satrexToast from '../../../components/satrexToast';
import Trans, { transFn } from '../../../components/Trans';
import { satrexSemiGray } from '../../../styles/colors';
import useIsLtr from '../../../hooks/useIsLtr';
import Counter from '../Counter';

interface resetPasswordProps{
  setKeyboardUp: (arg0: boolean)=>void,
  setFooterLinks: (arg0: React.ReactNode)=>void,
}

const ResetPassword:React.FC<resetPasswordProps> = ({ setKeyboardUp, setFooterLinks }) => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setRepeatedShowPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState();
  const [oparationLoading, setOparationLoading] = useState(false);
  const [showSetPasswordPart, setShowSetPasswordPart] = useState(false);
  const [timer, setTimer] = useState(Date.now() + 5000);
  const isLtr = useIsLtr();
  const counterRef = useRef();
  const handleCounter = () => {
    setTimer(Date.now() + 18000);
    setTimeout(() => {
      // @ts-ignore
      if (counterRef.current) counterRef.current.start();
    }, 1000);
  };

  const handleSendSmsCode = async () => {
    if (!mobile) return satrexToast(transFn('Mobile phone entry is mandatory'), 'error');
    setOparationLoading(true);
    const result = await sendSmsCodeByNumber({
      mobile: mobile.replace(/\s/g, '').replace('+', '00'),
    });
    if (result) {
      setShowSetPasswordPart(true);
      handleCounter();
    }
    setOparationLoading(false);
  };

  const handleResitingPassword = async () => {
    if (password !== repeatedPassword) {
      satrexToast(transFn('The passwords entered do not match!'), 'error');
    } else if (!secretCode) {
      satrexToast(transFn('Entering the security code is mandatory'), 'error');
    } else {
      setOparationLoading(true);
      const result = await resetPassword({
        mobile: mobile.replace(/\s/g, '').replace('+', '00'),
        smsSecretCode: secretCode.replace(/-/g, ''),
        newPassword: password,
      });
      if (result) {
        const loginResult = await loginWithPhoneAndPassword(mobile, password);
        if (loginResult) {
          history.replace('/home');
        }
      }
      setOparationLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setFooterLinks(<p
          style={{ color: 'white', textAlign: 'center', cursor: 'pointer' }}
          onClick={() => history.push('/login')}
      >
        <Trans>LoginToSatrex</Trans>
                     </p>);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="resetPasswordPage">

      {
        !showSetPasswordPart
        && (
          <div className="animate__animated animate__fadeIn" style={{ direction: 'ltr' }}>
            <InputMask
              value={mobile}
              // @ts-ignore
              maskChar=""
              onFocus={() => setKeyboardUp(true)}
              onBlur={() => setKeyboardUp(false)}
              onChange={(e) => setMobile(e.target.value)}
              placeholder={transFn('mobile')}
              mask="+98 **********"
              formatChars={{ '*': '[A-Za-z0-9]' }}

            >
              {(inputProps: any) => (
                <SessionInput
                  style={{ marginBottom: 200 }}
                  {...inputProps}
                />
              )}

            </InputMask>
            <IonButton className="sessionButton" onClick={handleSendSmsCode}><Trans>Send code</Trans></IonButton>

          </div>
        )
      }
      {
        showSetPasswordPart
        && (
          <div className="animate__animated animate__fadeIn " style={{ direction: 'ltr' }}>
            {
              isLtr
                ? (
                  <div style={{ fontSize: '14px', marginTop: '4%', textAlign: 'center' }}>
                    <span>Confirmation code sent to</span>
                    <span className={isLtr ? 'enNum' : ''}>0</span>
                    <span
                      style={{ textAlign: 'left' }}
                    >
            {mobile.substring(4).replace(' ', '')}
                    </span>
                    <span>mobile number</span>
                  </div>
                )
                : (
                  <div style={{ fontSize: '14px', marginTop: '4%', textAlign: 'center' }}>
                    <span><Trans>codeWasSent</Trans></span>
                    <span className={isLtr ? 'enNum' : ''}>0</span>
                    <span
                      style={{ textAlign: 'left' }}
                    >
            {mobile.substring(4).replace(' ', '')}
                    </span>
                    <span>ارسال گردید</span>
                  </div>
                )
            }
            <div style={{ marginTop: 20 }}>
              <Counter
                counterRef={counterRef}
                handleSendSmsCode={handleSendSmsCode}
                timer={timer}
              />
            </div>
            <InputMask
              value={secretCode}
              onFocus={() => setKeyboardUp(true)}
              onBlur={() => setKeyboardUp(false)}
              onChange={(e) => setSecretCode(e.target.value)}
              mask="9-9-9-9-9-9"
              disabled={false}
              placeholder={transFn('Security code')}
              // @ts-ignore
              maskChar=" "
            >
              {(inputProps: any) => (
                <SessionInput
                  className="secretCodeInput"
                  style={{ marginTop: 30 }}
                  {...inputProps}
                />
              )}
            </InputMask>
            <SessionInput
              style={{ marginTop: 50 }}
              value={password}
              onFocus={() => setKeyboardUp(true)}
              onBlur={() => setKeyboardUp(false)}
              onChange={(e:any) => setPassword(e.target.value)}
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
            <SessionInput
              style={{ marginTop: 50 }}
              value={repeatedPassword}
              onFocus={() => setKeyboardUp(true)}
              onBlur={() => setKeyboardUp(false)}
              onChange={(e:any) => setRepeatedPassword(e.target.value)}
              placeholder={transFn('repeatPassword')}
              type={showRepeatedPassword ? 'text' : 'password'}
              endAdornment={(
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setRepeatedShowPassword(!showRepeatedPassword)}
                    edge="end"
                  >
                    {showRepeatedPassword
                      ? <VisibilityOff style={{ color: satrexSemiGray, fontSize: 13 }} />
                      : <Visibility style={{ color: satrexSemiGray, fontSize: 13 }} />}
                  </IconButton>
                </InputAdornment>
              )}

            />

            <IonButton
              className="sessionButton"
              style={{ marginTop: 30 }}
              onClick={handleResitingPassword}
            >
              <Trans>continue</Trans>
            </IonButton>

            <p
              style={{
                color: 'white', textAlign: 'center', cursor: 'pointer', marginTop: 20,
              }}
              onClick={() => setShowSetPasswordPart(false)}
            >
              <Trans>back</Trans>
            </p>

            <IonLoading
              // cssClass='my-custom-class'
              isOpen={oparationLoading}
              onDidDismiss={() => setOparationLoading(false)}
              message={transFn('please wait...')}
              spinner="lines"
            />
          </div>
        )
      }
    </div>
  );
};

export default ResetPassword;

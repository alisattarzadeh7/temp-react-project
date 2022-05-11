import React, { useEffect, useState } from 'react';
import { IonButton, IonLoading } from '@ionic/react';
import { useHistory } from 'react-router';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputMask from 'react-input-mask';
import SessionInput from '../SessionInput';
import { satrexSemiGray } from '../../../styles/colors';
import { register, registerValidate } from '../../../utils/apis';
import satrexToast from '../../../components/satrexToast';
import Trans, { transFn } from '../../../components/Trans';

export default ({ setKeyboardUp, setFooterLinks }) => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setRepeatedShowPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [oparationLoading, setOparationLoading] = useState(false);
  const [showCodePart, setShowCodePart] = useState(false);

  const handleRegistration = async () => {
    if (password !== repeatedPassword) {
      satrexToast(transFn('Repeat password does not match new password'), 'error');
    }
    setOparationLoading(true);
    const result = await registerValidate(mobile, password);
    setOparationLoading(false);
    if (result) setShowCodePart(true);
    // history.push('/home')
  };
  const finalRegisteration = async () => {
    setOparationLoading(true);
    const result = await register(mobile, password, secretCode, referralCode);
    setOparationLoading(false);
    if (result) history.push('/home');
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
    <>
      {
        !showCodePart
        && (
          <div className="animate__animated animate__fadeIn" style={{ direction: 'ltr' }}>
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
            <SessionInput
              style={{ marginTop: 50 }}
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
            <SessionInput
              style={{ marginTop: 50 }}
              value={repeatedPassword}
              onFocus={() => setKeyboardUp(true)}
              onBlur={() => setKeyboardUp(false)}
              onChange={(e) => setRepeatedPassword(e.target.value)}
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
            <IonButton className="sessionButton" onClick={handleRegistration}><Trans>RegisterAtSatrex</Trans></IonButton>

          </div>
        )
      }
      {
        showCodePart
        && (
          <div className="animate__animated animate__fadeIn" style={{ direction: 'ltr' }}>
            <InputMask
              value={secretCode}
              onFocus={() => setKeyboardUp(true)}
              onBlur={() => setKeyboardUp(false)}
              onChange={(e) => setSecretCode(e.target.value)}
              mask="9-9-9-9-9-9"
              disabled={false}
              maskChar=" "
              placeholder={transFn('Security code')}

            >
              {(inputProps) => (
                <SessionInput
                  className="secretCodeInput"
                  style={{ marginTop: 30 }}
                  {...inputProps}
                />
              )}
            </InputMask>

            <SessionInput
              value={referralCode}
              onFocus={() => setKeyboardUp(true)}
              onBlur={() => setKeyboardUp(false)}
              onChange={(e) => setReferralCode(e.target.value)}
              style={{ marginTop: 30 }}
              placeholder={transFn('Referral code')}
            />
            <IonButton
              className="sessionButton"
              style={{ marginTop: 30 }}
              onClick={finalRegisteration}
            >
              <Trans>continue</Trans>
            </IonButton>

            <p
              style={{
                color: 'white', textAlign: 'center', cursor: 'pointer', marginTop: 20,
              }}
              onClick={() => setShowCodePart(false)}
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
    </>
  );
};

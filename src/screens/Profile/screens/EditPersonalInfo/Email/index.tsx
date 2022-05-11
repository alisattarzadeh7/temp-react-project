import React, { useEffect, useState } from 'react';
import { IonButton } from '@ionic/react';
import { useQueryClient } from 'react-query';
import { Alert, IconButton, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import SatrexInput from '../../../../../components/SatrexInput';
import { sendEmailVerificationCode, updateEmail, varifyEmail } from '../../../../../utils/apis';
import satrexToast from '../../../../../components/satrexToast';
import { useUserEmail } from '../../../../../utils/queries';
import Trans, { transFn } from '../../../../../components/Trans';
import { LayoutState, ProgressViewPropsTypes } from '../../../../../utils/interfaces';
import { satrexGreen } from '../../../../../styles/colors';

const index: React.FC<ProgressViewPropsTypes> = ({ setMaxAllowedStep, setStopStep }) => {
  const [email, setEmail] = useState<string>('');
  const [varifyCode, setVarifyCode] = useState<string>('');
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [resendEmailCode, setResendEmailCode] = useState<boolean>(false);
  const [timer, setTimer] = useState<string>('');
  const { data: userEmail } = useUserEmail();
  const [inputLocked, setInputLocked] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (userEmail && userEmail.data) {
        if (userEmail.data.emailAddress) setEmail(userEmail.data.emailAddress);
        if (!userEmail.data.emailConfirmed) {
          if (setStopStep) {
            setStopStep(1);
          }
        }
        if (userEmail.data.emailConfirmed) {
          // @ts-ignore
          setMaxAllowedStep(2);
          if (setStopStep) {
            setStopStep(2);
          }
        }
        setInputLocked(userEmail.data.emailConfirmed);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [userEmail]);

  const initailTimer = () => {
    const countDownDate = new Date(new Date().getTime() + 2 * 60000).getTime();
    const x = setInterval(() => {
      const now = new Date().getTime();

      const distance = countDownDate - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // (minutes + "m " + seconds + "s ")
      setTimer(`${minutes}:${seconds}`);
      if (distance < 0) {
        setResendEmailCode(false);
        setTimer('');
        clearInterval(x);
      }
    }, 1000);
  };

  const handleUpdateEmail = async () => {
    if (!email) return satrexToast(transFn('Email value could not be empty'), 'error');
    const result = await updateEmail({
      emailAddress:email
    });
    return result;
  };

  const sendVarificationCode = async () => {
    if (!email) return satrexToast(transFn('Email value could not be empty'), 'error');

    const result = await sendEmailVerificationCode(email);
    setResendEmailCode(result);
    if (result) {
      setCodeSent(true);
      initailTimer();
    }
    return true;
  };

  const varifyEmailViaCode = async () => {
    if (!email || !varifyCode) return satrexToast(transFn('The values ​​entered are incorrect'), 'error');
    const result = await varifyEmail({
      email,
      secretCode: varifyCode.replace(/-/g, '')
    });
    if (result) {
      satrexToast(transFn('Email verified successfully'), 'success');
      queryClient.invalidateQueries('userEmail');
    }
    return false;
  };

  return (
    <div style={{ padding: 10 }}>
      <div style={{ width: '100%' }}>
        {
            userEmail && userEmail.data && userEmail.data.emailConfirmed
          && <Alert severity="success"><Trans>adminAcceptation</Trans></Alert>
        }

      </div>
      {
          !inputLocked
          && (
              <div className=" flex row-reverse">
                <Tooltip
                    title={transFn('save')}
                    aria-label={transFn('save')}
                >
                  <IconButton
                      className="GradientsButton"
                      onClick={() => handleUpdateEmail()}
                      disabled={inputLocked}
                      style={{ padding: 4 }}
                  >
                    <SaveIcon
                        style={{ color: satrexGreen }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
          )
      }
      <div style={{ marginTop: 10, display: 'flex', width: '100%' }}>

        <div style={{ width: '80%' }}>

          {
            codeSent && resendEmailCode
              ? (
                <SatrexInput
                  value={varifyCode}
                  disabled={inputLocked}
                  onChange={(e: any) => setVarifyCode(e.target.value)}
                  label={transFn('varifyEmailCode')}
                />
              )
              : (
                <SatrexInput
                  style={{
                    textAlign: 'left',
                    direction: 'ltr',
                  }}
                  disabled={inputLocked}
                  value={email}
                  type="email"
                  className="emailInput"
                  onChange={(e: any) => setEmail(e.target.value)}
                  label={transFn('Enter your email')}
                  placeholder="example@example.com"
                />
              )

          }
        </div>
        <IonButton
          className="GradientsButton emailBtn"
          disabled={inputLocked}
          style={{ width: '20%', height: 40 }}
          onClick={(!codeSent || !resendEmailCode) ? () => sendVarificationCode() : () => {
          }}
        >
          {
            !codeSent || !resendEmailCode ? (
                <Trans>
                  Send code
                </Trans>
              )
              : (
                <>
                  {timer}
                </>
              )
          }
        </IonButton>
      </div>
      {
        codeSent
          && (
            <IonButton
              className="GradientsButton"
              style={{ width: '40%', marginTop: 24, height: 40 }}
              onClick={varifyEmailViaCode}
              disabled={inputLocked}
            >
              <Trans>confirm</Trans>
            </IonButton>
          )

      }
    </div>
  );
};

export default index;

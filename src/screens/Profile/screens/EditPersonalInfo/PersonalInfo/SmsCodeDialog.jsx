import React, { useState } from 'react';
import { Dialog, DialogContent, Grid } from '@mui/material';
import InputMask from 'react-input-mask';
import { IonButton } from '@ionic/react';
import SatrexInput from '../../../../../components/SatrexInput';
import Trans from '../../../../../components/Trans';

const SmsCodeDialog = ({ open, setOpen, action }) => {
  const [phoneSecretCode, setPhoneSecretCode] = useState('');

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent>
            <span style={{ fontSize: 14, fontWeight: 'bold' }}>
              <Trans>The code was sent to you</Trans>
            </span>
          <div style={{ width: '100%', marginTop: '20px' }}>
            <InputMask
              mask="*-*-*-*-*"
              formatChars={{ '*': '[0-9]' }}
              maskChar=""
              inputProps={{
                numberFormat: 'FARSI',
              }}
              value={phoneSecretCode}
              onChange={(e) => {
                setPhoneSecretCode(e.target.value);
              }}
              style={{ textAlign: 'center', letterSpacing: 3 }}
            >
              {
                (inputProps) => (
                  <SatrexInput
                    {...inputProps}
                    label="validationCode"
                  />
                )
              }
            </InputMask>
            <center style={{ width: '100%' }}>

              <Grid container>
                <Grid xs={6} item>

                  <IonButton
                    className="grayButton"
                    style={{ width: '90%', marginTop: '30px' }}
                    onClick={() => {
                      setOpen(false);
                      setPhoneSecretCode(null);
                    }}
                  >
                    <Trans>cancel</Trans>
                  </IonButton>

                </Grid>
                <Grid xs={6} item>
                  <IonButton
                    className="GradientsButton"
                    style={{ width: '90%', marginTop: '30px' }}
                    onClick={() => action(phoneSecretCode)}
                  >
                    <Trans>send</Trans>
                  </IonButton>
                </Grid>
              </Grid>

            </center>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SmsCodeDialog;

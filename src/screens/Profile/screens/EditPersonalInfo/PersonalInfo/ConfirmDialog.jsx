import React from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import { IonButton } from '@ionic/react';
import Trans from '../../../../../components/Trans';

const ConfirmDialog = ({
                         open, handleClose, personalInfo, action,
                       }) => (
  <>
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle><span style={{ fontWeight: 'bold', fontSize: 15 }}><Trans>Are you sure you want to send the following information?</Trans></span></DialogTitle>
      <div style={{ padding: 15, paddingBottom: 0 }}>
        <p>
          <Trans>firstName</Trans>
          {' '}
          :
          {' '}
          {personalInfo.firstName}
        </p>
        <p>
          <Trans>lastName</Trans>
          {' '}
          :
          {' '}
          {personalInfo.lastName}
        </p>
        <p>
          <Trans>Gender</Trans>
          {' '}
          :
          {' '}
          <Trans>{personalInfo.gender}</Trans>
        </p>
        <p>
          <Trans>nationalId</Trans>
          {' '}
          :
          {' '}
          {personalInfo.nationalId}
        </p>
        <p>
          <Trans>birthDate</Trans>
          {' '}
          :
          {' '}
          {personalInfo.birthdate}
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 20 }}>
        <IonButton
          className="GradientsButton"
          style={{ width: '50%', marginTop: '30px' }}
          onClick={action}
        >
          <Trans>submit</Trans>
        </IonButton>
      </div>
    </Dialog>
  </>
);
export default ConfirmDialog;

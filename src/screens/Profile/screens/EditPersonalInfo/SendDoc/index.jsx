import React, { useContext, useEffect, useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { IonButton, IonLoading } from '@ionic/react';
import { Alert, IconButton, Tooltip } from '@mui/material';
import { Delete } from '@material-ui/icons';
import { useQueryClient } from 'react-query';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { sendImagesConfirmRequest, uploadNationalCardImage, uploadPersonalImage } from '../../../../../utils/apis';
import satrexToast from '../../../../../components/satrexToast';
import useStyles from './styles';
import AppContext from '../../../../../contexts/AppContext';
import Trans, { transFn } from '../../../../../components/Trans';
import PersonalImageSample from '../../../../../components/PersonalImageSample';
import { satrexGreen } from '../../../../../styles/colors';

const dropzoneTheme = createTheme({
  components: {
    styleOverrides: {
      MuiDropzoneArea: {
        root: {
          minHeight: 180,
        },
      },
    },
  },
});

export default ({ userImages }) => {
  const { nationalCard, personalImage, lastConfirmationType } = userImages;
  const [nationalCardImage, setNationalCardImage] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [nationalCardPreview, setNationalCardPreview] = useState(nationalCard);
  const [personalImageImage, setPersonalImageImage] = useState(null);
  const [personalImagePreview, setPersonalImagePreview] = useState(personalImage);
  const [inputLocked, setInputLocked] = useState(false);
  const queryClient = useQueryClient();
  const classes = useStyles({
    nationalCardPreview,
    personalImagePreview,
  });

  const handleNationalCardImage = (files) => {
    setNationalCardImage(files[0]);

    const file = files[0];
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setNationalCardPreview(reader.result);
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSendImages = async () => {
    setShowLoading(true);
    if (personalImageImage && !await uploadPersonalImage(personalImageImage)) setShowLoading(false);
    if (nationalCardImage && !await uploadNationalCardImage(nationalCardImage)) setShowLoading(false);

    const result = await sendImagesConfirmRequest();
    setShowLoading(false);
    if (result) {
      await queryClient.invalidateQueries('getUserImage');
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setInputLocked(lastConfirmationType !== 'Editable');
    }
    return () => {
      isMounted = false;
    };
  }, [lastConfirmationType]);

  const saveImages = async (showNotif = true) => {
    if (personalImageImage) {
      const personalImageResult = await uploadPersonalImage(personalImageImage);
      if (personalImageResult && showNotif) {
       satrexToast(transFn('Personal image uploaded successfully'), 'success');
      }
    } else if (personalImage && personalImagePreview) {
      satrexToast(transFn('Personal photo has not changed'), 'error');
    } else {
      satrexToast(transFn('Some personal photos could not be left blank'), 'error');
    }
    if (nationalCardImage) {
      const nationalImageResult = await uploadNationalCardImage(nationalCardImage);
      if (nationalImageResult && showNotif) {
        satrexToast(transFn('National card image uploaded successfully'), 'success');
      }
    } else if (nationalCard && nationalCardPreview) {
      satrexToast(transFn('The photo of the national card has not changed'), 'error');
    } else {
      satrexToast(transFn('Some national card photos can not be blank'), 'error');
    }
    return false;
  };

  const handlePersonalImage = (files) => {
    setPersonalImageImage(files[0]);

    const file = files[0];
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setPersonalImagePreview(reader.result);
      },
      false,
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '40px' }}>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        {
             lastConfirmationType === 'Rejected'
          && <Alert severity="error"><Trans>adminRejection</Trans></Alert>
        }
        {
             lastConfirmationType === 'Accepted'
          && <Alert severity="success"><Trans>adminAcceptation</Trans></Alert>
        }
        {
             lastConfirmationType === 'ConfirmRequest'
          && <Alert severity="info"><Trans>adminPending</Trans></Alert>
        }
        {
             lastConfirmationType === 'VerifiedBySystem'
          && <Alert severity="success"><Trans>ApprovedBySystem</Trans></Alert>
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
                      onClick={saveImages}
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
      <ThemeProvider theme={dropzoneTheme}>
        <div style={{ position: 'relative' }}>
          <p><Trans>uploadNationalCardImage</Trans></p>
          <DropzoneArea
            filesLimit={1}
            showPreviewsInDropzone={false}
            showAlerts={false}
            classes={{
              root: classes.dropzoneStyles1,
              icon: classes.dropzoneIconStyle,
            }}
            Icon={AddIcon}
            onChange={inputLocked ? () => {} : handleNationalCardImage}
            dropzoneText=""
          />
          {
            nationalCardPreview && !inputLocked
              ? (
                <IconButton
                  style={{ position: 'absolute', bottom: 7, left: 10 }}
                  onClick={() => {
                    setNationalCardImage(null);
                    setNationalCardPreview(null);
                  }}
                  className="deleteBtn"
                >
                  <Delete style={{ color: 'red', fontSize: 20 }} />
                </IconButton>
              ) : (
                <CloudUploadOutlinedIcon style={{
                  color: 'rgba(0, 0, 0, 0.12)', fontSize: 25, position: 'absolute', bottom: 13, left: 15,
                }}
                />
              )
          }
        </div>
        <div style={{ position: 'relative' }}>
          <p>
<Trans>sendPersonalPhotoAsPattern</Trans>
&nbsp;&nbsp;&nbsp;&nbsp;
      <PersonalImageSample />
          </p>
          <DropzoneArea
            filesLimit={1}
            showPreviewsInDropzone={false}
            showAlerts={false}
            classes={{
              root: classes.dropzoneStyles2,
              icon: classes.dropzoneIconStyle,
            }}
            Icon={AddIcon}
            onChange={inputLocked ? () => {} : handlePersonalImage}
            dropzoneText=""
          />
          {
            personalImagePreview && !inputLocked
              ? (
                <IconButton
                  style={{ position: 'absolute', bottom: 8, left: 10 }}
                  onClick={() => {
                    setPersonalImageImage(null);
                    setPersonalImagePreview(null);
                  }}
                  className="deleteBtn"
                >
                  <Delete style={{ color: 'red', fontSize: 20 }} />
                </IconButton>
              ) : (
                <CloudUploadOutlinedIcon style={{
                  color: 'rgba(0, 0, 0, 0.12)', fontSize: 25, position: 'absolute', bottom: 15, left: 15,
                }}
                />
              )
          }

        </div>
      </ThemeProvider>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <IonButton
          className="GradientsButton"
          style={{ width: '100%', marginTop: '30px' }}
          onClick={handleSendImages}
          disabled={inputLocked}
        >
          <Trans>submit</Trans>
        </IonButton>
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

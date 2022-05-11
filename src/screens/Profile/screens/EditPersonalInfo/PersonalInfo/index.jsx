import React, { useContext, useEffect, useState } from 'react';
import {
    IonButton, IonIcon, IonLabel, IonLoading, IonSelect, IonSelectOption,
} from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import jMoment from 'jalali-moment';
import { Alert, IconButton, Tooltip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import { Delete } from '@material-ui/icons';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useQueryClient } from 'react-query';
import SaveIcon from '@mui/icons-material/Save';
import SatrexInput from '../../../../../components/SatrexInput';
import PersianDatePicker from '../../../../../components/PersianDatePicker';
import ConfirmDialog from './ConfirmDialog';
import {
    cancelPersonalInfoConfirmRequest,
    codeVarification,
    sendSmsForIndentifying, setPersonalInfoConfirmReq,
    updatePersonalInfo, uploadNationalCardImage,
    uploadPersonalImage,
} from '../../../../../utils/apis';
import { usePersonalInfo } from '../../../../../utils/queries';
import Trans, { transFn } from '../../../../../components/Trans';
import satrexToast from '../../../../../components/satrexToast';
import SmsCodeDialog from './SmsCodeDialog';
import AppContext from '../../../../../contexts/AppContext';
import isNotNull from '../../../../../utils/helpers/isNull';
import PersonalImageSample from '../../../../../components/PersonalImageSample';
import useStyles from '../SendDoc/styles';
import { satrexGreen } from '../../../../../styles/colors';
import starkString from "starkstring";
import convertDate from "../../../../../components/convertDate";

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

const customAlertOptions = {
    header: transFn('Gender'),
    translucent: true,
};

const areEqual = (prevProps, nextProps) => prevProps === nextProps;

export default React.memo(({ userImages, setMaxAllowedStep, setStopStep }) => {
    const { nationalCard, personalImage } = userImages;
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [gender, setGender] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [phone, setPhone] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const { data: personalInfo } = usePersonalInfo();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [codeDialogOpen, setCodeDialogOpen] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [finotekFailed, setFinotekFailed] = useState(false);
    const [nationalCardImage, setNationalCardImage] = useState();
    const [nationalCardPreview, setNationalCardPreview] = useState(nationalCard);
    const [personalImageImage, setPersonalImageImage] = useState();
    const [personalImagePreview, setPersonalImagePreview] = useState(personalImage);
    const [finotekTry, setFinotekTry] = useState(0);
    const [inputLocked, setInputLocked] = useState(false);
    const queryClient = useQueryClient();
    const classes = useStyles({
        nationalCardPreview,
        personalImagePreview,
    });
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

    const saveInfo = async (showNotif = true) => {
        setShowLoading(true);
        setDialogOpen(false);
        if (isNotNull({
            firstName,
            lastName,
            nationalId,
            phone,
            birthdate,
            gender,
        })) {
            const result = await updatePersonalInfo({
                firstName,
                lastName,
                nationalId,
                citizenId,
                isForeignCitizen,
                phone,
                birthdate: starkString(convertDate(starkString(birthdate.replace(/\//g, '-')).englishNumber().toString())).englishNumber().toString(),
                gender,
            });

            if (result) {
                if (showNotif) {
                    setShowLoading(false);
                    satrexToast(transFn('Information saved successfully'), 'success');
                }
                return true;
            }
        }
        setShowLoading(false);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const sendInfo = async () => {
        setShowLoading(true);
        if (finotekFailed || (personalInfo && finotekTry >= 2)) {
            if (isNotNull({
                nationalCardImage,
                personalImageImage,
            })) {
                await uploadPersonalImage(personalImageImage);
                await uploadNationalCardImage(nationalCardImage);
                const result = await setPersonalInfoConfirmReq();
                if (result) await queryClient.invalidateQueries('personalInfo');
                setShowLoading(false);
                return true;
            }
            setShowLoading(false);
            return false;
        }
        const saveResult = await saveInfo(false);
        if (saveResult) {
            const result = await sendSmsForIndentifying();
            setFinotekTry(finotekTry + 1);
            setShowLoading(false);
            if (result) {
                setCodeDialogOpen(true);
                satrexToast(transFn('The code was sent to you'), 'success');
            }
        }
        return true;
    };

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

    const handleCancelReq = async () => {
        const result = await cancelPersonalInfoConfirmRequest();
        setPersonalImagePreview(null);
        setNationalCardPreview(null);
        if (result) await queryClient.invalidateQueries('personalInfo');
    };

    const checkCode = async (code) => {
        const result = await codeVarification({
            otp: code.replace(/-/g, ''),
        });
        if (result === 'finotekFailed') {
            setFinotekFailed(true);
            setCodeDialogOpen(false);
        } else if (result) {
            setCodeDialogOpen(false);
           await queryClient.invalidateQueries('personalInfo');
        }
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (personalInfo) {
                setLastName(personalInfo.lastName);
                setFirstName(personalInfo.firstName);
                setGender(personalInfo.gender);
                setNationalId(personalInfo.nationalId);
                setPhone(personalInfo.username);
                setFinotekTry(personalInfo.externalIdentityAuthorizationRequestCounter);
                setBirthdate(personalInfo.birthDate ? jMoment(personalInfo.birthDate).format('jYYYY/jMM/jDD') : '');
                setInputLocked(personalInfo.lastConfirmationType !== 'Editable');
                if (personalInfo.lastConfirmationType === 'Accepted' || personalInfo.lastConfirmationType === 'VerifiedBySystem') {
                    setStopStep(1);
                    setMaxAllowedStep(1);
                }
            }
            return () => {
                document.getElementsByClassName('alert-button-role-cancel')[0]?.click();
            };
        }
        return () => {
            isMounted = false;
        };
    }, [personalInfo]);

    return (
        <div
            style={{
                paddingLeft: '20px', paddingRight: '20px', paddingBottom: '40px', overflow: 'hidden',
            }}
            className="personalInfoView"
        >
            {
                personalInfo && personalInfo.lastConfirmationType !== 'Editable'
                && (
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                        {
                            personalInfo && personalInfo.lastConfirmationType === 'Rejected'
                            && <Alert severity="error"><Trans>adminRejection</Trans></Alert>
                        }
                        {
                            personalInfo && personalInfo.lastConfirmationType === 'Accepted'
                            && <Alert severity="success"><Trans>adminAcceptation</Trans></Alert>
                        }
                        {
                            personalInfo && personalInfo.lastConfirmationType === 'ConfirmRequest'
                            && <Alert severity="info"><Trans>adminPending</Trans></Alert>
                        }
                        {
                            personalInfo && personalInfo.lastConfirmationType === 'VerifiedBySystem'
                            && <Alert severity="success"><Trans>ApprovedBySystem</Trans></Alert>
                        }

                    </div>
                )
            }
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
                                onClick={() => saveInfo()}
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
            <div>
                <IonLabel><span><Trans>Gender</Trans></span></IonLabel>
                <IonSelect
                    okText={transFn('confirm')}
                    cancelText={transFn('cancel')}
                    interfaceOptions={customAlertOptions}
                    value={gender}
                    onIonChange={(e) => setGender(e.detail.value)}
                    className="satrexInput"
                    disabled={inputLocked}

                >
                    <IonSelectOption value="Female"><span><Trans>Female</Trans></span></IonSelectOption>
                    <IonSelectOption value="Male"><span><Trans>Male</Trans></span></IonSelectOption>
                </IonSelect>
            </div>
            <div style={{ marginTop: 10 }}>
                <SatrexInput
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    label="firstName"
                    disabled={inputLocked}
                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <SatrexInput
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    label="lastName"
                    disabled={inputLocked}

                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <SatrexInput
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    label="nationalId"
                    style={{ textAlign: 'left', direction: 'ltr' }}
                    disabled={inputLocked}

                />
            </div>
            <div style={{ marginTop: '10px' }}>
                <SatrexInput
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    label="phoneNumber"
                    style={{ textAlign: 'left', direction: 'ltr' }}
                    disabled
                />
            </div>
            <div style={{ marginTop: '10px' }} className="row">
                <div style={{ width: '100%' }}>
                    <SatrexInput
                        label="birthDate"
                        style={{ textAlign: 'center' }}
                        defaultValue={birthdate}
                        disabled={inputLocked}

                    />
                </div>
                <div style={{ width: 0 }}>
                    <IonIcon
                        className="personalInfoDatePickerBtn"
                        onClick={!inputLocked ? () => setShowDatepicker(true) : () => {
                        }}
                        icon={calendarOutline}
                    />
                </div>
                <PersianDatePicker
                    showDatepicker={showDatepicker}
                    setShowDatepicker={setShowDatepicker}
                    setSelectedDate={setBirthdate}
                />
            </div>
            {
                (finotekFailed || (personalInfo && finotekTry >= 2))
                && (
                    <ThemeProvider theme={dropzoneTheme}>
                        <div style={{ position: 'relative' }}>
                            <p><Trans>uploadNationalCardImage</Trans></p>
                            <DropzoneArea
                                filesLimit={inputLocked ? 0 : 1}
                                showPreviewsInDropzone={false}
                                showAlerts={false}
                                classes={{
                                    root: classes.dropzoneStyles1,
                                    icon: classes.dropzoneIconStyle,
                                }}
                                onChange={inputLocked ? () => {
                                } : handleNationalCardImage}
                                dropzoneText={<></>}
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
                                            color: 'rgba(0, 0, 0, 0.12)',
                                            fontSize: 25,
                                            position: 'absolute',
                                            bottom: 13,
                                            left: 15,
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
                                onChange={inputLocked ? () => {
                                } : handlePersonalImage}
                                dropzoneText={<></>}
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
                                            color: 'rgba(0, 0, 0, 0.12)',
                                            fontSize: 25,
                                            position: 'absolute',
                                            bottom: 15,
                                            left: 15,
                                        }}
                                        />
                                    )
                            }

                        </div>
                    </ThemeProvider>
                )
            }
            <div className="flex space-between" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
                {

                    personalInfo && personalInfo.lastConfirmationType === 'ConfirmRequest' ? (
                        <IonButton
                            className="GradientsButton full-width"
                            style={{ width: '100%', marginTop: '30px' }}
                            onClick={handleCancelReq}
                        >
                            لغو درخواست بررسی
                        </IonButton>
                    ) : (
                        <>
                            <IonButton
                                disabled={inputLocked}
                                className="GradientsButton full-width"
                                style={{ width: '100%', marginTop: '30px' }}
                                onClick={async () => {
                                    if (personalInfo && finotekTry < 2) setDialogOpen(true);
                                    else await sendInfo();
                                }}
                            >
                                <Trans>submit</Trans>
                            </IonButton>
                        </>
                    )
                }

            </div>
            <ConfirmDialog
                open={dialogOpen}
                handleClose={handleClose}
                action={sendInfo}
                personalInfo={{
                    gender,
                    firstName,
                    lastName,
                    nationalId,
                    birthdate,
                }}
            />
            <SmsCodeDialog
                open={codeDialogOpen}
                setOpen={setCodeDialogOpen}
                action={checkCode}
            />
            <IonLoading
                // cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={transFn('please wait...')}
                spinner="lines"
            />
        </div>
    );
}, areEqual);

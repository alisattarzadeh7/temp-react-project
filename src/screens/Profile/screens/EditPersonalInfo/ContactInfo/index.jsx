import React, { useEffect, useState } from 'react';
import {
  IonButton, IonIcon, IonLabel, useIonPicker,
} from '@ionic/react';
import { chevronDownOutline } from 'ionicons/icons';
import { useQueryClient } from 'react-query';
import { Alert, IconButton, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import SatrexInput from '../../../../../components/SatrexInput';
import SatrexTextArea from '../../../../../components/SatrexTextArea';
import satrexText from '../../../../../images/about/satrex2.png';
import { satrexGray, satrexGreen } from '../../../../../styles/colors';
import { useAddressInfo, useProvinces } from '../../../../../utils/queries';
import Cities from './Cities';
import {
  cancelContactInfoConfirmRequest,
  setContactInfoConfirmReq,
  updateAddressInfo,
} from '../../../../../utils/apis';
import satrexToast from '../../../../../components/satrexToast';
import Trans, { transFn } from '../../../../../components/Trans';

export default ({ setMaxAllowedStep, setStopStep }) => {
  const [present] = useIonPicker();
  const { data: provinces } = useProvinces().provinces;
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [inputLocked, setInputLocked] = useState(false);
  const [selectedCity, setSelectedCity] = useState();
  const [selectedProvince, setSelectedProvince] = useState({
    text: null,
    value: null,
  });
  const { data: addressInfo } = useAddressInfo();
  const queryClient = useQueryClient();
  const lang = useSelector((state) => state.layout.language);
  const isLtr = lang === 'EN';

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (addressInfo) {
        setSelectedCity({
          text: addressInfo.city,
          value: addressInfo.cityId,
        });
        setSelectedProvince({
          text: addressInfo.province,
          value: addressInfo.provinceId,
        });
        setAddress(addressInfo.address ?? '');
        setPostalCode(addressInfo.postalCode ?? '');
        setPhone(addressInfo.phone ?? '');
        if (addressInfo.lastConfirmationType === 'Accepted') {
          setStopStep(4);
          setMaxAllowedStep(4);
        }

        setInputLocked(addressInfo.lastConfirmationType !== 'Editable');
      }
    }
    return () => {
      isMounted = false;
    };
  }, [addressInfo]);

  const handleProvinesList = () => {
    present({
      buttons: [
        {
          text: 'تایید',
          handler: (selected) => {
            setSelectedProvince(selected.province);
          },
        },
      ],
      columns: [
        {
          name: 'province',
          options: provinces.map((item) => ({ ...item, text: item.persianTitle, value: item.id })),
        },
      ],
    });
  };

  const saveInfo = async (showNotif = true) => {
    const result = await updateAddressInfo({
      cityId: selectedCity.value,
      address,
      postalCode,
      phone,
    });
    if (result) {
      if (showNotif) {
        await queryClient.invalidateQueries('getAddressInfo');
        satrexToast(transFn('Information successfully recorded'), 'success');
      }
      return true;
    }
    return false;
  };

  const sendInfo = async () => {
    const result = await saveInfo(false);
    if (result) {
      await setContactInfoConfirmReq();
      await queryClient.invalidateQueries('getAddressInfo');
    }
  };

  const handleCancelReq = async () => {
    const result = await cancelContactInfoConfirmRequest();
    if (result) {
      await queryClient.invalidateQueries('getAddressInfo');
    }
  };

  return (
    <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '40px' }}>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        {
          addressInfo && addressInfo.lastConfirmationType === 'Rejected'
          && <Alert severity="error"><Trans>adminRejection</Trans></Alert>
        }
        {
          addressInfo && addressInfo.lastConfirmationType === 'Accepted'
          && <Alert severity="success"><Trans>adminAcceptation</Trans></Alert>
        }
        {
          addressInfo && addressInfo.lastConfirmationType === 'ConfirmRequest'
          && <Alert severity="info"><Trans>adminPending</Trans></Alert>
        }
        {
          addressInfo && addressInfo.lastConfirmationType === 'VerifiedBySystem'
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
                      onClick={saveInfo}
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
      <div style={{ width: '100%', position: 'relative' }}>
        <IonLabel><span><Trans>province</Trans></span></IonLabel>
        <div
          style={{
            padding: 0, paddingRight: 5, display: 'flex', alignItems: 'center',
          }}
          className="satrexInput"
          onClick={(provinces && provinces.length > 0 && !inputLocked) ? handleProvinesList : () => {
          }}
        >
          {
          }
          &nbsp;&nbsp;&nbsp;
          {selectedProvince.text}
        </div>
        <div style={{ position: 'absolute' }} className="selectArrow">
          <IonIcon icon={chevronDownOutline} style={{ color: satrexGray }} />
        </div>
      </div>
      <Cities
        id={selectedProvince.value}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        disabled={inputLocked}
      />
      <div>
        <SatrexInput
          disabled={inputLocked}
          label="postCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <SatrexInput
          disabled={inputLocked}
          label="telephone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <SatrexTextArea
          disabled={inputLocked}
          label="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
      {

        addressInfo && addressInfo.lastConfirmationType === 'ConfirmRequest' ? (
          <IonButton
            className="GradientsButton"
            style={{ width: '100%', marginTop: '30px' }}
            onClick={handleCancelReq}
          >
            <Trans>Review Request</Trans>
          </IonButton>
        ) : (
          <>
            <IonButton
              disabled={inputLocked}
              className="GradientsButton"
              style={{ width: '100%', marginTop: '30px' }}
              onClick={sendInfo}
            >
              <Trans>submit</Trans>
            </IonButton>
          </>
        )
      }
      </div>
      <div className="satrexTextDiv">
        <img src={satrexText} style={{ width: '100%' }} alt="" />
      </div>
    </div>
  );
};

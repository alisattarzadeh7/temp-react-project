import {
  IonCard,
  IonCardContent, useIonAlert,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useTour } from '@reactour/tour';
import marketImg from '../../images/home/markets.png';
import walletImg from '../../images/home/wallet.png';
import fastDealImg from '../../images/home/fastDealing.png';
import turnOverImg from '../../images/home/accounting.png';
import securityImg from '../../images/home/security.png';
import reportImg from '../../images/home/reports.png';
import MenuItem from './MenuItem';
import Trans from '../../components/Trans';
import SuspendDialog from '../../components/SuspendDialog';
import { askForPermissionToReceiveNotifications } from '../../firebaseSetting';
import tourLoader from '../../utils/helpers/tourLoader';

const Index = () => {
  const history = useHistory();
  const [present] = useIonAlert();
  const [bannedOpen, setBannedOpen] = useState(false);
  const qualityLevel = useSelector((state) => state.user.qualityLevel);
  const { setIsOpen, setSteps } = useTour();
  //
  // // console.log(history);
  // const testApi = async () => {
  //   console.log('test api : ', await getBankAccountsTest());
  // };
  useEffect(() => {
    // testApi();
    let isMounted = true;
    if (isMounted) {
      if (history.location.state === 'banned') {
        setBannedOpen(true);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [history]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
    askForPermissionToReceiveNotifications();
    tourLoader(setIsOpen, setSteps, 'home');
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigation = (route) => {
    if ((route === '/accounting' || route === '/fast-dealing') && parseInt(qualityLevel.code, 10) === 0) {
      setBannedOpen(true);
    } else history.push(route);
  };

  const handleClose = () => {
    setBannedOpen(false);
  };
  // console.log('this component is being rerendered');
  const menuItem = [
    <IonCard style={{ transition: '0.1s' }}>

      <IonCardContent style={{ padding: 20, cursor: 'pointer' }} onClick={() => handleNavigation('/markets')}>
        <center>
          <div className="full-width"><img src={marketImg} style={{ width: '65%' }} alt="" /></div>
          <div style={{ marginTop: 8, fontSize: 17 }}><Trans>markets</Trans></div>
        </center>
      </IonCardContent>
    </IonCard>,
    <IonCard style={{ transition: '0.1s' }}>
      <IonCardContent style={{ padding: 20, cursor: 'pointer' }} onClick={() => handleNavigation('/wallet')}>
        <center>
          <div className="full-width"><img src={walletImg} style={{ width: '65%' }} alt="" /></div>
          <div style={{ marginTop: 8, fontSize: 17 }}><Trans>wallet</Trans></div>
        </center>
      </IonCardContent>
    </IonCard>,
    <IonCard style={{ transition: '0.1s' }}>
      <IonCardContent style={{ padding: 20, cursor: 'pointer' }} onClick={() => handleNavigation('/fast-dealing')}>
        <center>
          <div className="full-width"><img src={fastDealImg} style={{ width: '65%' }} alt="" /></div>
          <div style={{ marginTop: 8, fontSize: 17 }}><Trans>quickDealing</Trans></div>
        </center>
      </IonCardContent>
    </IonCard>,
    <IonCard style={{ transition: '0.1s' }}>
      <IonCardContent style={{ padding: 20, cursor: 'pointer' }} onClick={() => handleNavigation('/accounting')}>
        <center>
          <div className="full-width"><img src={turnOverImg} style={{ width: '65%' }} alt="" /></div>
          <div style={{ marginTop: 8, fontSize: 17 }}><Trans>accounting</Trans></div>
        </center>
      </IonCardContent>
    </IonCard>,
    <IonCard style={{ transition: '0.1s' }}>
      <IonCardContent style={{ padding: 20, cursor: 'pointer' }} onClick={() => handleNavigation('/reports')}>
        <center>
          <div className="full-width"><img src={securityImg} style={{ width: '65%' }} alt="" /></div>
          <div style={{ marginTop: 8, fontSize: 17 }}><Trans>report</Trans></div>
        </center>
      </IonCardContent>
    </IonCard>,
    <IonCard style={{ transition: '0.1s' }}>
      <IonCardContent style={{ padding: 20, cursor: 'pointer' }} onClick={() => handleNavigation('/security')}>
        <center>
          <div className="full-width"><img src={reportImg} style={{ width: '65%' }} alt="" /></div>
          <div style={{ marginTop: 8, fontSize: 17 }}><Trans>security</Trans></div>
        </center>
      </IonCardContent>
    </IonCard>,
  ];

  return (
    <>

      <div style={{ height: '100%', paddingTop: 10, paddingBottom: 36 }}>

        {/* <MainSearchInput /> */}
        <div className="mainPageContainer">

          <div className="row" style={{ position: 'relative', zIndex: 2 }}>
            {
              menuItem.map((item, index) => <MenuItem key={index} index={index}>{item}</MenuItem>)
            }
          </div>

        </div>
      </div>
      <SuspendDialog handleClose={handleClose} open={bannedOpen} />
    </>
  );
};

export default Index;

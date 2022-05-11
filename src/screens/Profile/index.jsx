import React, {
 useContext, useEffect, useRef, useState,
} from 'react';
import { createOutline, mailOutline, personOutline } from 'ionicons/icons';
import SwipeableViews from 'react-swipeable-views';
import { useTour } from '@reactour/tour';
import TabBtn from '../../components/TabBtn';
import EditBankInfo from './screens/EditBankInfo';
import EditPersonalInfo from './screens/EditPersonalInfo';
import Messages from './screens/Messages';
import AppContext from '../../contexts/AppContext';
import Trans from '../../components/Trans';
import Refresher from '../../components/Refresher';
import tourLoader from '../../utils/helpers/tourLoader';

const PickerExample = () => {
  const [globState, setGlobState] = useContext(AppContext);
  const [pageNum, setPageNum] = useState(2);
  const { setIsOpen, setSteps } = useTour();

  const handleChangeIndex = (index) => {
    setPageNum(index);
  };
  const section = useRef();

    useEffect(() => {
        tourLoader(setIsOpen, setSteps, 'profile');
        return () => {
            setGlobState({ ...globState, tabValue: null });
        };
    }, []);

  return (
    <div className=" full-height full-width remainedHeight flex column">
      <Refresher
        queries={['getUserMessages', 'bankAccounts', 'getUserImage', 'getProvices', 'getAddressInfo', 'personalInfo']}
      />
      <div className="section row " style={{ height: 80, padding: '7px 15px' }}>
        <div style={{ width: '32%', height: '100%' }} className="md hydrated" data-tut="editBankInfo">
          <TabBtn
            className={` ${pageNum === 2 ? 'selectedTransparentButton' : 'transparentButton'}`}
            onClick={() => {
              setPageNum(2);
            }}
            icon={createOutline}
          >
            <Trans>editBankInfo</Trans>
          </TabBtn>
        </div>
        <div style={{ width: '40%', height: '100%' }} className="md hydrated " data-tut="editProfile">
          <TabBtn
            className={` ${pageNum === 1 ? 'selectedTransparentButton' : 'transparentButton'}`}
            onClick={() => {
              setPageNum(1);
            }}
            icon={personOutline}
          >
            <Trans>editProfile</Trans>
          </TabBtn>
        </div>
        <div style={{ width: '28%', height: '100%' }} className="md hydrated " data-tut="messages">
          <TabBtn
            className={` ${pageNum === 0 ? 'selectedTransparentButton' : 'transparentButton'}`}
            onClick={() => {
              setPageNum(0);
            }}
            icon={mailOutline}
          >
            <Trans>messages</Trans>
          </TabBtn>
        </div>
      </div>
      <div ref={section} className="remainedHeight flex pr" style={{ borderBottom: 'none' }}>

        <div className="profileViewStyle pa" style={{ height: '100%' }}>
          <SwipeableViews index={pageNum} axis="x" onChangeIndex={handleChangeIndex}>
            <Messages />
            <EditPersonalInfo />
            <EditBankInfo />
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
};
export default PickerExample;

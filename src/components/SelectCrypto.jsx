import React, { useEffect } from 'react';
import { IonIcon, IonLabel, useIonPicker } from '@ionic/react';
import { chevronDownOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { satrexGray } from '../styles/colors';
import Trans, { transFn } from './Trans';

const SelectCrypto = ({
                        selectedCrypto, setSelectedCrypto, coinList, onCoinChoose, dataTut,
                      }) => {
  const [present, dismiss] = useIonPicker();
  const language = useSelector((state) => state.layout.language);
  const isLtr = language === 'EN';

  useEffect(() => () => {
      dismiss();
    }, []);

  const handleCoinList = () => {
    present({
      buttons: [
        {
          text: transFn('confirm'),
          handler: (selected) => {
            if (onCoinChoose) onCoinChoose(selected.coins.value);

            setSelectedCrypto({
              ...selected.coins,
              id: selected.coins.value,
            });
          },
        },
      ],
      columns: [
        {
          name: 'coins',
          options: coinList?.data.filter((item) => item.persianTitle !== 'تومان').map((item) => ({
            ...item,
            text: isLtr ? item.englishTitle : item.persianTitle,
            value: item.id,
            img: item.base64Image,
          })),
        },
      ],
    });
  };

  return (
    <div style={{ width: '100%', position: 'relative' }} data-tut="chooseCryptoSection">
      <IonLabel><span><Trans>chooseCrypto</Trans></span></IonLabel>
      <div
        style={{
          padding: 0, paddingRight: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        className="satrexInput"
        onClick={handleCoinList}
      >
        {
          selectedCrypto.id && (
            <img
              src={coinList?.data.filter((item) => item.id === selectedCrypto.id)[0]?.imageAddress}
              style={{ width: 30, height: 30 }}
              alt=""
            />
          )
        }
        &nbsp;&nbsp;&nbsp;
        {selectedCrypto.text}
      </div>
      <div style={{
        position: 'absolute', left: !isLtr ? 15 : 'unset', right: isLtr ? 15 : 'unset', top: 32,
      }}
      >
        <IonIcon icon={chevronDownOutline} style={{ color: satrexGray }} />
      </div>
    </div>
  );
};
export default SelectCrypto;

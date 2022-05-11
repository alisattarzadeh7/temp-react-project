import React from 'react';
import { IonIcon, IonLabel, useIonPicker } from '@ionic/react';
import { chevronDownOutline } from 'ionicons/icons';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { satrexGray } from '../../../../../styles/colors';
import { useCities } from '../../../../../utils/queries';
import Trans, { transFn } from '../../../../../components/Trans';

const Cities = ({
                  id, selectedCity, setSelectedCity, disabled,
                }) => {
  const [present] = useIonPicker();

  const { data: cities } = useCities({id});
  const lang = useSelector((state) => state.layout.language);

  const isLtr = lang === 'EN';
  const handleCitiesList = () => {
    present({
      buttons: [
        {
          text: transFn('confirm'),
          handler: (selected) => {
            setSelectedCity(selected.city);
          },
        },
      ],
      columns: [
        {
          name: 'city',
          options: _.orderBy(cities, ['persianTitle'], ['asc']).map((item) => ({
            ...item,
            text: item.persianTitle,
            value: item.id,
          })),
        },
      ],
    });
  };

  return (
    <>
          <div style={{ width: '100%', position: 'relative' }}>
            <IonLabel><span><Trans>city</Trans></span></IonLabel>
            <div
              style={{
                padding: 0, paddingRight: 5, display: 'flex', alignItems: 'center',
              }}
              className="satrexInput"
              onClick={(cities && cities.length > 0 && !disabled) ? handleCitiesList : () => {
              }}
            >
              {
              }
              &nbsp;&nbsp;&nbsp;
              {selectedCity?.text}
            </div>
            <div style={{ position: 'absolute' }} className="selectArrow">
              <IonIcon icon={chevronDownOutline} style={{ color: satrexGray }} />
            </div>
          </div>
    </>
  );
};
export default Cities;

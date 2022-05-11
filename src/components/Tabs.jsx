import React from 'react';

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/react';
import {
  homeOutline,
  settingsOutline,
  peopleOutline,
} from 'ionicons/icons';
import { useParams } from 'react-router';
import Routes from '../routes';
import Trans from './Trans';

export const Tabs = (props) => {
  const { name } = useParams();

  return (
    <>

      {
        name !== 'no-internet'
        && (
          <IonTabs>
            {props.content}

            <IonTabBar slot="bottom">

              <IonTabButton tab="setting" href="/setting">
                <IonIcon icon={settingsOutline} />
                <IonLabel>
                  <span><Trans>setting</Trans></span>
                </IonLabel>
              </IonTabButton>
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline} />
                <IonLabel>
                  <span><Trans>Home</Trans></span>
                </IonLabel>
              </IonTabButton>

              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={peopleOutline} />
                <IonLabel>
                  <span><Trans>profile</Trans></span>
                </IonLabel>
              </IonTabButton>

            </IonTabBar>

            <IonRouterOutlet id="main">

              <Routes />
            </IonRouterOutlet>

          </IonTabs>
        )
      }
    </>

  );
};

export default Tabs;

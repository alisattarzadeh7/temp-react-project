import React from 'react';
import {
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
} from '@ionic/react';

import { useHistory, useLocation } from 'react-router-dom';
import { chevronForwardOutline, chevronBackOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import Trans from './Trans';
import './Menu.css';
import logo from '../images/logo.png';
import logoText from '../images/loginComponent/logoBlackText.svg';

import Icon1 from '../images/sidbar/1.png';
import Icon2 from '../images/sidbar/2.png';
import Icon3 from '../images/sidbar/3.png';
import Icon4 from '../images/sidbar/4.png';
import Icon5 from '../images/sidbar/5.png';
import Icon6 from '../images/sidbar/6.png';
import Icon7 from '../images/sidbar/7.png';
import Icon8 from '../images/sidbar/8.png';
import Icon9 from '../images/sidbar/9.png';
import Icon11 from '../images/sidbar/11.png';
import { logingOut } from '../utils/apis';
import SatrexDialog from './SatrexDialog';
import useSatrexDialog from '../hooks/useSatrexDialog';
import logout from '../images/logout.svg';
import { LayoutState } from '../utils/interfaces';

interface AppPage {
    url: string;
    iosIcon: string;
    title: string;
}

const appPages: AppPage[] = [
    { title: 'dashboard', url: '/home', iosIcon: Icon1 },
    { title: 'wallet', url: '/wallet', iosIcon: Icon2 },
    { title: 'markets', url: '/markets', iosIcon: Icon3 },
    { title: 'accounting', url: '/accounting', iosIcon: Icon4 },
    { title: 'profile', url: '/profile', iosIcon: Icon5 },
    { title: 'security', url: '/security', iosIcon: Icon6 },
    { title: 'quickDealing', url: '/fast-dealing', iosIcon: Icon7 },
    { title: 'report', url: '/reports', iosIcon: Icon8 },
    { title: 'support', url: '/support', iosIcon: Icon9 },
    { title: 'Invite friends', url: '/invite-friends', iosIcon: Icon5 },
    // { title: 'contactus', url: '/contact-us', iosIcon: Icon10 },
    // { title: 'exit', url: '/login', iosIcon: Icon11 },
];

const Menu: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const { open, setOpen, handleClose } = useSatrexDialog();
    const language = useSelector((state: LayoutState) => state.layout.language);
    const isLtr = language === 'EN';
    const theme = useSelector((state: LayoutState) => state.layout.theme);

    const handleLogOut = async () => {
        const result = await logingOut();
        if (result) {
            localStorage.removeItem('bearerToken');
            localStorage.removeItem('refreshToken');
            history.replace('/login');
        }
        // console.log('loggin out');
    };

    return (
        <IonMenu side="start" contentId="main" type="overlay" className={!isLtr ? 'menuLeftRadius' : 'menuRightRadius'}>
            <IonContent dir={isLtr ? 'ltr' : 'rtl'} style={{ top: 0 }}>
                <IonList id="inbox-list" style={{ paddingTop: 10, borderBottom: 'none' }}>
                    <IonListHeader>
                        <div style={{ flexDirection: 'row', position: 'relative' }}>
                            <img src={logo} style={{ width: 30 }} alt="" />
                            <img
                                src={logoText}
                                style={{
                                    width: 120, position: 'relative', top: 5, filter: `invert(${!theme ? 1 : 0})`,
                                }}
                                alt=""
                            />

                        </div>
                    </IonListHeader>
                    <div className="menuItemDivider" style={{ marginTop: 12 }} />
                    {appPages.map((appPage, index) => (
                        <IonMenuToggle key={index} autoHide={false}>
                            <IonItem
                                className={`${location.pathname === appPage.url ? 'selected' : ''} navItem`}
                                routerLink={appPage.url}
                                routerDirection="none"
                                lines="none"
                                detail={false}
                            >
                                <img src={appPage.iosIcon} style={{ width: 30 }} alt="" />
                                &nbsp;&nbsp;&nbsp;
                                <IonLabel><span style={{ fontSize: 13 }}><Trans>{appPage.title}</Trans></span></IonLabel>
                                <IonIcon icon={isLtr ? chevronForwardOutline : chevronBackOutline} style={{ width: 15 }} />

                            </IonItem>
                            <div className="menuItemDivider" />
                        </IonMenuToggle>
                    ))}
                    <IonMenuToggle autoHide={false}>
                        <IonItem
                            className="navItem"
                            routerDirection="none"
                            lines="none"
                            detail={false}
                            onClick={() => setOpen(true)}
                        >
                            <img src={Icon11} style={{ width: 30 }} alt="" />
                            &nbsp;&nbsp;&nbsp;
                            <IonLabel><span style={{ fontSize: 13 }}><Trans>exit</Trans></span></IonLabel>
                            <IonIcon icon={isLtr ? chevronForwardOutline : chevronBackOutline} style={{ width: 15 }} />

                        </IonItem>
                        <div className="menuItemDivider" />
                    </IonMenuToggle>
                </IonList>
                <SatrexDialog
                    content={(
                        <div className="flex center column">
                            <img src={logout} alt="" />
                            <h5 style={{ marginTop: 20 }}>
                                <Trans>
                                    Are you logging out?
                                </Trans>
                            </h5>
                            <div className="flex center" style={{ marginTop: 20, width: '100%' }}>

                                <Button color="inherit" onClick={handleClose}><Trans>cancel</Trans></Button>
                                <IonButton
className="successBtn "
style={{ width: 100 }}
                                           onClick={handleLogOut}
                                >
<Trans>yes</Trans>
                                </IonButton>
                            </div>
                        </div>
                    )}
                    open={open}
                    handleClose={handleClose}
                />
            </IonContent>
        </IonMenu>
    );
};

export default Menu;

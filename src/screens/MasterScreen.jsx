import React, {
    useEffect, Suspense,
} from 'react';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import {
    notificationsOutline,
} from 'ionicons/icons';
import {
    useParams, useLocation, Switch,
} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import Trans from '../components/Trans';
import logo from '../images/logo.png';
import logoText from '../images/loginComponent/logoText.svg';
import { getSupportedCoinList } from '../redux/actions/CoinActions';
import satrexText from '../images/about/satrex2.png';
import { getUserLevel } from '../redux/actions/UserActions';
import Loader from '../components/Loader';
import ErrorFallback from '../components/ErrorFallback';
import styles from "./MasterScreenStyles.module.scss";


export default ({ children }) => {
    const dispatch = useDispatch();
    const { name } = useParams();
    const location = useLocation();
    const language = useSelector((state) => state.layout.language);
    const isLtr = language === 'EN';
    const [explode, setExplode] = React.useState(false);

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            dispatch(getUserLevel());
            dispatch(getSupportedCoinList());
        }
        return () => {
            isMounted = false;
        };
    }, [name]);

    return (
        <>
            <IonPage>

                <IonHeader>
                    <IonToolbar
                        className={name === 'home' ? 'homeToolbar' : 'toolbar'}
                        color="white"
                    >
                        <IonButtons slot="start" data-tut="menuButton">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>
              <span className={styles.logoSectionStyles}>
                <Trans>
                  {name !== 'home' ? location.pathname.split('/')[1]
                      : (
                          <div style={{ top: 1 }} className="pr">
                              <motion.img
                                  transition={{
                                      ease: 'easeInOut',
                                      duration: 2,
                                      flip: 'Infinity',
                                      repeatDelay: 5,
                                  }}
                                  initial={{ rotateY: 0, rotateZ: 0 }}
                                  animate={{ rotateY: 360, rotateZ: 360 }}
                                  src={logo}
                                  style={{ width: 30 }}
                                  alt=""
                              />
                              <img
                                  src={logoText}
                                  className={styles.logoTextStyles}
                                  alt=""
                              />

                          </div>
                      )}
                </Trans>
              </span>
                        </IonTitle>
                        <IonButtons slot="end">
                            <IonIcon
                                data-tut="notifSection"
                                icon={notificationsOutline}
                                className={styles.notifSectionStyles}
                                style={{
                                    marginLeft: isLtr ? 0 : 9, marginRight: isLtr ? 9 : 0,
                                }}
                            />
                        </IonButtons>

                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">{name}</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    {
                        name === 'home'
                        && <div className="homeCircle" />
                    }
                    <div
                        className={`flex column full-width flex ${styles.mainContentStyles}`}
                        id="routes"
                    >
                        <div className="satrexTextDiv">
                            <img src={satrexText} className="full-width" alt="" />
                        </div>
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            onReset={() => setExplode(false)}
                            resetKeys={[explode]}
                        >
                            <Suspense fallback={(
                                <div className="loaderStyles">
                                    <Loader />
                                </div>
                            )}
                            >

                                <AnimatePresence exitBeforeEnter>
                                    <Switch location={location} key={location.pathname}>
                                        {children}
                                    </Switch>
                                </AnimatePresence>
                            </Suspense>
                        </ErrorBoundary>
                    </div>
                </IonContent>

            </IonPage>
        </>
    );
};

import { IonApp, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cssTransition, ToastContainer } from 'react-toastify';
import './styles/global.scss';
import './styles/chart.scss';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './fonts/icons/font/flaticon.scss';
import './theme/variables.css';
import React, { useEffect, useState, Suspense } from 'react';
import { Route, useParams, Redirect } from 'react-router';
import './styles/DarkMode.scss';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import { Button, useMediaQuery } from '@mui/material';
import NoInternet from './screens/NoInternet';
import { AppProvider } from './contexts/AppContext';
import Auth from './components/Auth';
import { LayoutState } from './utils/interfaces';
import IntroSlides from './components/Slides';
import SatrexDialog from './components/SatrexDialog';
import downloadApp from './images/lottie/downloadApp.json';
import { satrexGreen } from './styles/colors';
import 'animate.css';
import TourContainer from './components/TourContainer';
import { changeTheme } from './redux/actions/LayoutActions';
import setTheme from './utils/helpers/setTheme';
import withClearCache from './ClearCache';
import Loader from './components/Loader';
const Session = React.lazy(() => import('./screens/Session'));
const Tabs = React.lazy(() => import('./components/Tabs'));
const Menu = React.lazy(() => import('./components/Menu'));
import Styles from "./App.module.scss"
import useIsLtr from "./hooks/useIsLtr";

const installOptions = {
    loop: true,
    autoplay: true,
    style: { width: '50%' },
    animationData: downloadApp,
};

const authRoutes  = ['login','register','reset-password'];

const MasterLayout = () => {
    const { name } = useParams<{ name: string }>();

    // checkAuth()
    if(authRoutes.includes(name))
        return <Session routeName={name} />;
    return (
        <>
            <Auth>
                <Menu />
                <Tabs />
            </Auth>
        </>
    );
};

const swirl = cssTransition({
    enter: 'swirl-in-fwd',
    exit: 'swirl-out-bck',
});

const MainApp: React.FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });
    const dispatch = useDispatch();
    const [showAlert1, setShowAlert1] = useState<boolean>(true);
    const redirections = useSelector((state: LayoutState) => state.layout.redirectUrls);
    const theme = useSelector((state: LayoutState) => state.layout.theme);
    const isLtr = useIsLtr();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(() => {
        if (prefersDarkMode) {
            dispatch(changeTheme(false));
        }
        setTheme(theme);
    }, []);

    return (

        <QueryClientProvider client={queryClient}>

            <AppProvider>
                <TourContainer>
                    <IonApp className={`${isLtr ? 'ltrApp' : 'rtlApp'} ${theme ? 'dark' : ''}`}>
                        <Suspense fallback={(
                            <div className="loaderStyles">
                                <Loader />
                            </div>
                        )}
                        >
                            <IonReactRouter>
                                <IonSplitPane contentId="main">

                                    {
                                        redirections.map((item: any, index: any) => (
                                            <Redirect
                                                key={item.fromUrl}
                                                from={item.fromUrl}
                                                to={item.toUrl}
                                            />
                                        ))
                                    }
                                    <Route path="/no-internet" exact>
                                        <NoInternet />
                                    </Route>
                                    <Route path="/" exact>
                                        <Redirect to="/home" />
                                    </Route>
                                    <Route path="/:name" exact>
                                        <MasterLayout />
                                    </Route>

                                </IonSplitPane>
                            </IonReactRouter>
                        </Suspense>
                    </IonApp>
                </TourContainer>
                <SatrexDialog
                    open={showAlert1}
                    handleClose={() => setShowAlert1(false)}
                    otherProps={{
                        className: 'installPwaAlert',
                    }}
                    content={(
                        <>
                            <Lottie
                                options={installOptions}
                                height={250}

                            />
                            <h6 style={{ textAlign: 'center', lineHeight: 2 }}>
                                مایلید ساتکرس را بر روی گوشی خود نصب کنید؟
                            </h6>
                            <div className="flex center full-width" style={{marginTop: 10}}>
                                <Button style={{ color: 'gray' }} onClick={() => setShowAlert1(false)}>بعدا</Button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <Button
                                    style={{ backgroundColor: satrexGreen }}
                                    variant="contained"
                                    className="installPwa"
                                >
                                    نصب
                                </Button>
                            </div>

                        </>
                    )}
                />
                <ReactQueryDevtools initialIsOpen />
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={!isLtr}
                    pauseOnFocusLoss
                    style={{ height: 50 }}
                    draggable
                    pauseOnHover
                    transition={swirl}

                />
            </AppProvider>

        </QueryClientProvider>

    );
};

const ClearCacheComponent = withClearCache(MainApp);

function App() {
    return <ClearCacheComponent />;
}

export default App;

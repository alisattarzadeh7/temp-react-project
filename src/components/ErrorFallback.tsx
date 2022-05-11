import React from 'react';
import { IonButton } from '@ionic/react';
import errorImg from '../images/error.svg';
import Trans from './Trans';
import satrexText from '../images/about/satrex2.png';

interface ErrorFallbackProps {
    error: any,
    resetErrorBoundary: any,
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
    <>
        <div role="alert" className="errorPageContainer">
            <div className="homeCircle" style={{ zIndex: 9 }} />
            <div style={{ position: 'relative', zIndex: 10 }}>
                <div>
                    <img src={errorImg} alt="" style={{ width: '100%' }} />
                </div>
                <div
                    style={{
                        flexDirection: 'column', width: '100%', alignItems: 'center', marginTop: 10,
                    }}
                    className=" flex column center middle"
                >
                    <h3><Trans>Something went wrong</Trans></h3>
                    {
                        process.env.NODE_ENV === 'development'
                        && <h5 style={{ color: 'red', marginTop: 10 }}>{error.message}</h5>
                    }
                    <IonButton
                        className="sessionButton"
                        style={{
                            margin: 0, marginTop: 30, width: '50%', minWidth: 300,
                        }}
                        onClick={resetErrorBoundary}
                    >
                        <Trans>Retry</Trans>
                    </IonButton>

                </div>
            </div>
            <div className="satrexTextDiv">
                <img src={satrexText} style={{ width: '100%' }} alt="" />
            </div>
        </div>
    </>
);

export default ErrorFallback;

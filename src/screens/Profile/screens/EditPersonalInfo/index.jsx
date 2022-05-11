import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { useUserImages } from '../../../../utils/queries';
import ProgressView from '../../../../components/ProgressView';
import { transFn } from '../../../../components/Trans';
import satrexToast from '../../../../components/satrexToast';

const PersonalInfo = React.lazy(() => import('./PersonalInfo'));
const ContactInfo = React.lazy(() => import('./ContactInfo'));
const SendDoc = React.lazy(() => import('./SendDoc'));
const Email = React.lazy(() => import('./Email'));
const EditBankInfo = React.lazy(() => import('../EditBankInfo/EditBankInfo'));


export default () => {
    const { data: userImages } = useUserImages();
    const [value, setValue] = useState(0);
    const [maxAllowedStep, setMaxAllowedStep] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [stopStep, setStopStep] = useState(-1);
    const [fullyMounted, setFullyMounted] = useState(false);
    const [viewsReady, setViewsReady] = useState(false);
    const handleChangeIndex = (fn) => {
        if (fn(value) <= maxAllowedStep) {
            setValue(fn(value));
            setActiveStep(fn(value) * 25);
        }
    };
    const handleSwitching = async (index) => {
        if (parseInt(index, 10) > maxAllowedStep) {
            await handleChangeIndex(() => 0);
            setViewsReady(false);
            await handleChangeIndex(() => maxAllowedStep);
            setViewsReady(true);
            satrexToast(transFn('Please complete this step first'), 'error');
        }
    };

    useEffect(() => {
            let isMounted = true;
            if (isMounted) {
                setViewsReady(true);
            }
            return () => {
                isMounted = false;
            };
        }, []);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (stopStep >= value && !fullyMounted) {
                setValue(stopStep);
                setActiveStep(stopStep * 25);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [stopStep]);
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (stopStep >= value + 1 && stopStep !== -1) {
                setFullyMounted(true);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [value]);

    return (
        <div className="section remainedHeight overflowAuto pageBottomArea">

            <ProgressView
                handleChangeIndex={(val) => handleChangeIndex(() => val)}
                activeStep={activeStep}
                onSwitching={handleSwitching}
                slide={value}
                steps={[
                    transFn('personalInfo'),
                    transFn('email'),
                    transFn('bankInfo'),
                    transFn('contactInfo'),
                    transFn('sendingDocs'),
                ]}
                views={viewsReady ? [
                    userImages && (
                        <PersonalInfo
                            setMaxAllowedStep={setMaxAllowedStep}
                            handleChangeIndex={handleChangeIndex}
                            userImages={userImages}
                            setStopStep={setStopStep}
                        />
                    ),
                    <Email
                        setMaxAllowedStep={setMaxAllowedStep}
                        setStopStep={setStopStep}
                        handleChangeIndex={handleChangeIndex}
                    />,
                    <EditBankInfo
                        setMaxAllowedStep={setMaxAllowedStep}
                        setStopStep={setStopStep}
                        handleChangeIndex={handleChangeIndex}
                    />,
                    <ContactInfo
                        setMaxAllowedStep={setMaxAllowedStep}
                        setStopStep={setStopStep}
                        handleChangeIndex={handleChangeIndex}
                    />,
                    userImages && <SendDoc userImages={userImages} />,
                ] : ['', '', '', '', '']}
            />
        </div>
    );
};

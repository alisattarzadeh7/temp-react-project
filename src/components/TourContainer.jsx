import React from 'react';
import { TourProvider } from '@reactour/tour';
import { keyframes } from '@emotion/react';
import { useSelector } from 'react-redux';
import rootTourConfig from '../screens/RootTourConfig';
import { satrexGreen } from '../styles/colors';

const keyframesRotate = keyframes`
  50% {
    transform: translateY(-5px);
  }
`;

const radius = 10;

function TourContainer({ children }) {
    const theme = useSelector((state) => state.layout.theme);
    const loadedPages = localStorage.getItem('loadedPages');
    let steps = [];
    if (loadedPages) steps = rootTourConfig[JSON.parse(loadedPages).active];

    return (
        <TourProvider
                steps={steps}
                // disableKeyboardNavigation={['esc']}
                disableInteraction
                currentStep={0}
                maskClassName={theme ? 'tourMaskLight' : 'tourMaskDark'}
                padding={{ mask: 3, popover: [1, 5] }}
                scrollSmooth
                onClickMask={({
                     setCurrentStep, currentStep, setIsOpen, steps: currentSteps,
                    }) => {
                    if (currentStep === currentSteps.length - 1) {
                        setIsOpen(false);
                    }
                    setCurrentStep((s) => (s === currentSteps.length - 1 ? 0 : s + 1));
                }}
                styles={{
                    popover: (base) => ({
                        ...base,
                        '--reactour-accent': satrexGreen,
                        borderRadius: radius,
                    }),
                    maskArea: (base) => ({ ...base, rx: radius }),
                    maskWrapper: (base) => ({ ...base, color: '#000000' }),
                    badge: (base) => ({ ...base, left: 'auto', right: '-0.8125em' }),
                    controls: (base) => ({ ...base, marginTop: 100 }),
                    close: (base) => ({
                         ...base, right: 'auto', left: 8, top: 8,
                        }),
                    dot: (base) => ({
                        ...base,
                        animationDuration: '1s',
                        animationName: keyframesRotate,
                        animationIterationCount: 'infinite',
                        '&:nth-of-type(1)': {
                            animationDelay: '.3s',
                        },
                        '&:nth-of-type(2)': {
                            animationDelay: '.6s',
                        },
                    }),
                }}
        >
                {
                    children
                }
        </TourProvider>
    );
}

export default TourContainer;

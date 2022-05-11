import React, { Suspense } from 'react';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';
import SwipeableViews from 'react-swipeable-views';
// import { primaryColor } from '../Theme/variables';
import { useSelector } from 'react-redux';
import { LayoutState, ProgressViewTypes } from '../utils/interfaces';
import { satrexGreen } from '../styles/colors';
import Loader from './Loader';

const ProgressView: React.FC<ProgressViewTypes> = ({
                                                       views, steps, handleChangeIndex, slide, activeStep, onSwitching,
                                                   }) => {
    const lang = useSelector((state: LayoutState) => state.layout.language);
    const isLtr = lang === 'EN';
    //
    // const handleChildPosition = () => {
    //   let stepsPos = [];
    //   steps.forEach((item, index) => {
    //     if (index > 0) {
    //       stepsPos = [...stepsPos, (stepsPos[index - 1] + 1 * 10)];
    //       // stepsPos.push();
    //     } else {
    //       stepsPos = [0];
    //     }
    //   });
    //   console.log('stepsPos : ', stepsPos);
    //   return stepsPos;
    // };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
            }}
            >
                <div className="progressViewContainer">
                    <div style={{ transform: !isLtr ? 'rotate(180deg)' : 'unset' }}>
                        <ProgressBar
                            percent={activeStep}
                            filledBackground={satrexGreen}

                        >
                            {
                                steps.map((item, index) => (
                                    <Step key={item}>
                                        {(stepProps: any) => (
                                            <div
                                                onClick={() => handleChangeIndex(stepProps.index)}
                                                style={{
                                                    cursor: 'pointer',
                                                    width: (stepProps.index === slide || stepProps.index === slide - 1 || stepProps.index === slide + 1) ? 80 : 20,
                                                }}
                                                role="button"
                                                className={`stepDiv ${stepProps.accomplished ? 'reactedStep' : ''}`}
                                            >
                                                {/* <span className="title">{item.icon}</span> */}
                                                <span
                                                    className={`subtitle ${stepProps.accomplished ? 'bold' : ''}`}
                                                >
                                                    <div>{index + 1}</div>
                                                    {
                                                        (stepProps.index === slide || stepProps.index === slide - 1 || stepProps.index === slide + 1)
                                                        && (
                                                            <>
                                                                <div style={{
                                                                    height: 8,
                                                                    width: 2,
                                                                    borderLeft: 'solid 1px #989898',
                                                                    marginLeft: 5,
                                                                    marginRight: 5,
                                                                }}
                                                                />
                                                                <div>
                                                                    {item}
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                </span>
                                            </div>
                                        )}
                                    </Step>
                                ))
                            }
                        </ProgressBar>
                    </div>
                </div>
                <div style={{ width: '100%', marginTop: 20, direction: 'ltr' }}>
                    <SwipeableViews
                        ignoreNativeScroll
                        onSwitching={onSwitching}
                        axis="x-reverse"
                        index={slide}
                        onChangeIndex={(slideIndex) => handleChangeIndex(slideIndex)}
                    >
                        {
                            views
                            && views.slice(0, slide + 2).map((item, index) => (
                                <div key={index} style={{ width: '100%', height: '100%', direction: isLtr ? 'ltr' : 'rtl' }}>
                                    <Suspense fallback={(
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        >
                                            <Loader />
                                        </div>
                                    )}
                                    >
                                        {slide === index && (
                                            <div>
                                                {item}
                                            </div>
                                        )}

                                    </Suspense>
                                </div>
                            ))
                        }
                    </SwipeableViews>
                </div>

            </div>
        </div>
    );
};

export default ProgressView;

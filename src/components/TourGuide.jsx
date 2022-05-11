import React, { memo, useEffect } from 'react';
import { HelpOutline } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { useTour } from '@reactour/tour';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import RootTourConfig from '../screens/RootTourConfig';
import { setTourGuideStatus } from '../redux/actions/LayoutActions';
import { satrexGray } from '../styles/colors';

const TourGuide = () => {
    const {
        setIsOpen, setSteps, setCurrentStep, steps,
    } = useTour();
    const tourGuideStatus = useSelector((state) => state.layout.tourGuideReady);
    const location = useLocation();
    const dispatch = useDispatch();

    const openTour = () => {
        const loadedPages = localStorage.getItem('loadedPages');
        if (loadedPages) {
            setTimeout(() => {
                setSteps(RootTourConfig[JSON.parse(loadedPages).active]);
                setCurrentStep(0);
                setIsOpen(true);
            }, 500);
        }
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) dispatch(setTourGuideStatus(false));
        return () => {
            isMounted = false;
        };
    }, [location]);

    // console.log('tourGuideStatus : ', tourGuideStatus);
    // console.log('location : ', location);

    return (
        <>
            {
                tourGuideStatus
                && (
                    <IconButton onClick={openTour} data-tut="activateGuide">
                        <HelpOutline style={{
                            fontSize: 22,
                            color: location.pathname === '/home' ? satrexGray : 'white',
                        }}
                        />
                    </IconButton>
                )
            }

        </>
    );
};

export default memo(TourGuide);

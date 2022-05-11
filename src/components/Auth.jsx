import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory, useParams } from 'react-router';
import { setJwtToken, setRefreshTokenTime } from '../redux/actions/LoginActions';

const sessionUrls = ['/login', '/register', '/reset-password'];

export default ({ children }) => {
    const dispatch = useDispatch();
    const refreshTokenTime = useSelector((state) => state.login.refreshTokenTime);
    const token = useSelector((state) => state.login.token);
    const { name: routeName } = useParams();
    const history = useHistory();
    const [appReady, setAppReady] = useState(false);
    const [mounted, setMounted] = useState(false);
    const checkJwtAuth = () => {
         dispatch(setRefreshTokenTime(localStorage.getItem('expirationDate')));
         dispatch(setJwtToken(localStorage.getItem('bearerToken'), localStorage.getItem('refreshToken')));
        if (
            routeName !== '/register'
            && !localStorage.getItem('bearerToken')
        ) {
            history.replace('/login');
        } else if (routeName !== '/register') {
            if (
                moment().format('DD/MM/YYYY HH:mm:ss')
                > refreshTokenTime
                || moment().format('DD/MM/YYYY HH:mm:ss')
                > localStorage.getItem('expirationDate')
                || !localStorage.getItem('refreshToken')
            ) {
                console.log('شما به دلیل ردشدن تاریخ انقضا توکن به بیرون هدایت شدید');
                history.replace('/login');
            }
        }
        setAppReady(true);
    };

    // if (!mounted) {
    //
    // }

    useEffect(() => {
        checkJwtAuth();
        // setMounted(true);
    }, []);

    return (
        <>
            {children}
        </>
    );
};

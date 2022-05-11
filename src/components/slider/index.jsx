import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/navigation/navigation.scss';
import './slider.scss';
import { useSelector } from 'react-redux';

import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';
import { useMediaQuery } from '@mui/material';
import SatrexNumFormat from '../SatrexNumFormat';
import PercentageFormater from '../PercentageFormater';

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default () => {
    const supportedCoinList = useSelector((state) => state.coin.supportedCoinList);
    const [coinPriceChanger, setCoinPriceChanger] = useState(false);
    const [sliderReady, setSliderReady] = useState(false);
    const xs = useMediaQuery('(min-width:400px)');
    // console.log('supportedCoinList : ', supportedCoinList);

    useEffect(() => {
        let isMounted = true;
        let coinPriceChangerLoop;
        if (isMounted) {
            coinPriceChangerLoop = setInterval(() => {
                setCoinPriceChanger((state) => !state);
            }, 6000);
            return () => {
                isMounted = false;
                clearInterval(coinPriceChangerLoop);
            };
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (supportedCoinList) {
                setSliderReady(false);
                setTimeout(() => {
                    setSliderReady(true);
                }, 1000);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [supportedCoinList]);

    return (
        <div style={{ height: 80, minHeight: 80 }} className="section" data-tut="sliderSection">
            {
                sliderReady
                && (
                    <Swiper
                        slidesPerView={xs ? 3 : 2}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        speed={1000}
                        spaceBetween={0}
                        slidesPerGroup={1}
                        loop
                        loopFillGroupWithBlank
                        navigation
                        className="mySwiper"
                    >
                        {
                            supportedCoinList.filter((item) => item.destinationAssetSymbol === 'TOMAN').map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="row" style={{ height: '100%', width: '100%', flexDirection: 'row' }}>

                                        <div style={{ width: '70%', height: '100%', position: 'relative' }}>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: !coinPriceChanger ? -40 : 8,
                                                    width: '100%',
                                                }}
                                                className={`animate__animated ${
                                                    coinPriceChanger
                                                        ? 'animate__fadeInUp'
                                                        : 'animate__slideOutUp'
                                                }`}
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: 'bold',
                                                        textAlign: 'center',
                                                    }}
                                                    className="sliderTexts"
                                                >
                                                    {item.sourceAssetSymbol}
                                                </div>
                                                <div className="sliderTexts">
                                                    &nbsp;₮&nbsp;
                                                    <SatrexNumFormat
                                                        num={item.lastPriceInTether}
                                                    />
                                                </div>
                                                <span className="flex center">
                                            <PercentageFormater value={item.changeForLastIn24HoursInPercent} />
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: coinPriceChanger ? -40 : 8,
                                                    width: '100%',
                                                }}
                                                className={`animate__animated ${
                                                    !coinPriceChanger
                                                        ? 'animate__fadeInUp'
                                                        : 'animate__slideOutUp'
                                                }`}
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                    className="sliderTexts"
                                                >
                                                    {item.sourceAssetSymbol}
                                                </div>
                                                <div className="sliderTexts">
                                                    <SatrexNumFormat
                                                        num={item.lastPriceInToman}
                                                    />
                                                    <span style={{ fontSize: 9 }}>&nbsp;﷼&nbsp;</span>
                                                </div>
                                                <span className="flex center">
                       <PercentageFormater value={item.changeForLastIn24HoursInPercent} />
                                                </span>
                                            </div>

                                        </div>
                                        <div style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
                                            <div style={{ maxWidth: 55 }}>
                                                <img
                                                    src={item.sourceAssetImageAddress}
                                                    style={{ height: 'auto', width: 42 }}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))

                        }
                    </Swiper>
                )
            }
        </div>
    );
};

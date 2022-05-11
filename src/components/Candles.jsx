import React, { useEffect, useState } from 'react';
import { satrexGreen } from '../styles/colors';

export default (props) => {
    const [display, setDisplay] = useState('none');
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (props.part === 2) {
                setTimeout(() => {
                    setDisplay('inherit');
                }, (props.index + 70) * 100);
            } else {
                setTimeout(() => {
                    setDisplay('inherit');
                }, props.index * 100);
            }
        }
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div
style={{
 width: '10px', opacity: '0.5', display, flexDirection: 'column',
}}
className={`candleRow${props.index}`}
        >
            <div style={{ height: '150px', position: 'relative' }} className={`row greenCandleDiv${props.index}`}>
                <div
style={{
 border: `solid 1px ${satrexGreen}`, width: '8px', backgroundColor: satrexGreen, height: '50px', position: 'absolute', bottom: '0px', borderRadius: '2px',
}}
className={`candleGreen${props.index}`}
                />
                <div
style={{
 backgroundColor: satrexGreen, width: '1px', height: '140px', left: '4px', position: 'absolute', bottom: '0px', borderRadius: '2px',
}}
className={`candleGreenShadow${props.index}`}
                />
            </div>
            <div style={{ height: '150px', position: 'relative' }} className={`row redCandleDiv${props.index}`}>
                <div
style={{
 border: 'solid 1px red', width: '8px', backgroundColor: 'red', position: 'absolute', top: '0px', borderRadius: '2px',
}}
className={`candle${props.index} candleDelay`}
                />
                <div
style={{
 backgroundColor: 'red', width: '1px', height: '140px', position: 'relative', left: '4px', borderRadius: '2px',
}}
className={`candleShadow${props.index}`}
                />
            </div>
        </div>
    );
};

import React, { useEffect, useState } from 'react';

export default (props) => {
    const [show, setShow] = useState('none');

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setTimeout(() => {
                setShow('initial');
            }, props.index * 100);
        }
            return () => {
                isMounted = false;
            };
    }, []);

    return (
        <div style={{ width: '50%', display: show }} className="animateComeUp">
            {props.children}
        </div>
    );
};

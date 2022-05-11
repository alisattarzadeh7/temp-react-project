import React from 'react';
import Lottie from 'react-lottie';
import LoaderJson from '../images/satrexLoader.json';

const Loader: React.FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoaderJson,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <Lottie
            options={defaultOptions}
            height={120}
            width={120}
        />
    );
};

export default Loader;

import React from 'react';
import { useSelector } from 'react-redux';
import { satrexGreen } from '../styles/colors';
import SatrexNumFormat from './SatrexNumFormat';

interface PercentageFormaterProps {
    value: string;
    style?:any;
}

const PercentageFormater: React.FC<PercentageFormaterProps> = ({ value, ...otherProps }) => {
    const lang = useSelector((state:any) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';

    return (
        <span
        className="flex flexDirection ltr"
        style={{
            color:
                parseFloat(value) > 0
                    ? satrexGreen
                    : parseFloat(value)
                    < 0
                        ? 'red'
                        : '',
            width: 'fit-content',
        }}
        {...otherProps}
        >
    {
        (parseFloat(value) < 0) && !isEn && '-'
    }
        %
        <SatrexNumFormat
            num={Math.abs(parseFloat(value))}
        />
        {
            (parseFloat(value) < 0) && isEn && '-'
        }
        </span>
    );
};

export default PercentageFormater;

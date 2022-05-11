import React from 'react';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { IonIcon, IonToggle } from '@ionic/react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { satrexSemiLightGray } from '../../styles/colors';
import SatrexHr from '../../components/SatrexHr';
import LanguageSelection from './LanguageSelection';
import Trans from '../../components/Trans';
import Refresher from '../../components/Refresher';
import { changeTheme } from '../../redux/actions/LayoutActions';
import useIsLtr from "../../hooks/useIsLtr";

export default () => {
    const satrexTheme = useSelector((state) => state.layout.theme);
    const language = useSelector((state) => state.layout.language);
    const isLtr = useIsLtr();
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <div className="section full-width full-height pa">
            <Refresher
                queries={['']}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="row" style={{ padding: 20, cursor: 'pointer' }} onClick={handleClick}>
                    <div style={{ width: '50%', color: 'black', fontSize: 13 }}><Trans>Language</Trans></div>
                    <div style={{
                        width: '50%',
                        color: satrexSemiLightGray,
                        textAlign: isLtr ? 'right' : 'left',
                        flexDirection: isLtr ? 'row' : 'row-reverse',
                    }}
                    >
                        <span style={{ color: satrexSemiLightGray }}><Trans>{language}</Trans></span>
                        &nbsp;&nbsp;&nbsp;
                        <IonIcon
                            icon={isLtr ? chevronForwardOutline : chevronBackOutline}
                            style={{ fontSize: 15, position: 'relative', top: 5 }}
                        />
                    </div>
                </div>
                <SatrexHr />
                <div className="row" style={{ padding: 20 }}>
                    <div style={{ width: '50%', color: 'black', fontSize: 13 }}><Trans>Dark display mode</Trans></div>
                    <div style={{
                        width: '50%', color: satrexSemiLightGray, textAlign: isLtr ? 'right' : 'left', height: 0,
                    }}
                    >
                        <IonToggle
                            checked={!satrexTheme}
                            color="primary"
                            onClick={() => dispatch(changeTheme(!satrexTheme))}
                            style={{ position: 'relative', top: -8 }}
                        />
                    </div>
                </div>
                <SatrexHr />
                <div className="row" style={{ padding: 20, cursor: 'pointer' }}>
                    <div style={{ width: '50%', color: 'black', fontSize: 13 }}><Trans>Version</Trans></div>
                    <div
                        style={{
                            width: '50%',
                            color: satrexSemiLightGray,

                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                        className="row"
                    >
                        <span
                            style={{ color: satrexSemiLightGray, position: 'relative', top: 2 }}
                        >
1.0.0
                        </span>
                        &nbsp;&nbsp;
                        <div style={{
                            width: 8,
                            height: 8,
                            backgroundColor: 'red',
                            borderRadius: 10,
                            position: 'relative',
                            top: 7,
                        }}
                        />

                    </div>
                </div>
                <SatrexHr />
                <div className="row" style={{ padding: 20, cursor: 'pointer' }} onClick={() => history.push('/policies')}>
                    <div style={{ width: '50%', color: 'black', fontSize: 13 }}><Trans>terms</Trans></div>
                    <div style={{ width: '50%', color: satrexSemiLightGray, textAlign: isLtr ? 'right' : 'left' }}>
                        <IonIcon
                            icon={isLtr ? chevronForwardOutline : chevronBackOutline}
                            style={{ fontSize: 15, position: 'relative', top: 5 }}
                        />
                    </div>
                </div>
                <SatrexHr />
                <div className="row" style={{ padding: 20, cursor: 'pointer' }} onClick={() => history.push('/guide')}>
                    <div style={{ width: '50%', color: 'black', fontSize: 13 }}><Trans>guide</Trans></div>
                    <div style={{ width: '50%', color: satrexSemiLightGray, textAlign: isLtr ? 'right' : 'left' }}>

                        <IonIcon
                            icon={isLtr ? chevronForwardOutline : chevronBackOutline}
                            style={{ fontSize: 15, position: 'relative', top: 5 }}
                        />
                    </div>
                </div>
                <SatrexHr />
                <div className="row" style={{ padding: 20, cursor: 'pointer' }} onClick={() => history.push('/about')}>
                    <div style={{ width: '50%', color: 'black', fontSize: 13 }}><Trans>about</Trans></div>
                    <div style={{ width: '50%', color: satrexSemiLightGray, textAlign: isLtr ? 'right' : 'left' }}>

                        <IonIcon
                            icon={isLtr ? chevronForwardOutline : chevronBackOutline}
                            style={{ fontSize: 15, position: 'relative', top: 5 }}
                        />
                    </div>
                </div>
                <SatrexHr />
            </div>
            <LanguageSelection
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
            />
        </div>
    );
};

import React from 'react';
import Trans from '../../../../components/Trans';
import EditBankInfo from './EditBankInfo';
import useIsLtr from "../../../../hooks/useIsLtr";

export default () => {
  const isLtr = useIsLtr();

  return (
    <div className="section remainedHeight overflowAuto pageBottomArea">
      <div className="row">
        <div style={{
          width: '20%', paddingLeft: 10, paddingRight: 10, display: 'flex', alignItems: 'center',
        }}
        />
        <div style={{ width: '80%', padding: '10px 15px', textAlign: isLtr ? 'left' : 'right' }}>
          <span style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}><Trans>editBankInfo</Trans></span>
        </div>

      </div>
      <EditBankInfo />
    </div>
  );
};

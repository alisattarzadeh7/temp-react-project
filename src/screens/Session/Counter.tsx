import React, { ReactNode } from 'react';
import Countdown from 'react-countdown';
import { Button } from '@mui/material';
import { Cached } from '@mui/icons-material';
import Trans from '../../components/Trans';
import useIsLtr from '../../hooks/useIsLtr';

interface counterProps {
  handleSendSmsCode: () => void,
  counterRef:React.Ref<ReactNode>,
  timer:string | number,
}

const renderer = ({
                    hours, minutes, seconds, completed,
                  }:any, isLtr:boolean, handleSendSmsCode:() => void) => {
  if (completed) {
    return (
      <div style={{ width: '100%' }} className="flex center">
        <Button
          onClick={handleSendSmsCode}
          startIcon={<Cached />}
          color="primary"
        >
          &nbsp; &nbsp;
          <Trans>resend</Trans>
          {' '}
          &nbsp; &nbsp;
        </Button>
      </div>
    );
  }

  return (
    <p style={{ textAlign: 'center' }}>
      {
        isLtr
          ? (
            <>
              Resubmit the code in
              <span>
                          {minutes}
                :
                {seconds}
              </span>
            </>
          )
          : (
            <>
              ارسال مجدد کد تا
              <span>
                          {minutes}
                :
                {seconds}
              </span>
              دیگر
            </>
          )
      }

    </p>
  );
};

const Counter: React.FC<counterProps> = ({ handleSendSmsCode, counterRef, timer }) => {
  const isLtr = useIsLtr();

  return (
    <>
      <Countdown
        date={timer}
        renderer={(e) => renderer(e, isLtr, handleSendSmsCode)}
        // @ts-ignore
        ref={counterRef}
      />

    </>
  );
};

export default Counter;

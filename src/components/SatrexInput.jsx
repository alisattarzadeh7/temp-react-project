import React from 'react';
import Trans from './Trans';

export default (props) => {
  const randNum = Math.random();

  const inputProps = Object.filter(props, ([key, value]) => key !== 'dataTut' && key !== 'containerStyles');
  // const;
  // const executeScroll = () =>

  const handleInputFocus = () => {
    // setTimeout(() => {
    //   myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }, 5000);
  };

  return (
    <div style={props.containerStyles} data-tut={props.dataTut}>
      <label htmlFor={randNum.toString()}><Trans>{props.label}</Trans></label>
      <input type="text" {...inputProps} onFocus={handleInputFocus} id={randNum.toString()} className={`satrexInput ${inputProps.className}`} />
    </div>
  );
};

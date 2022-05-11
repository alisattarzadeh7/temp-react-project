import React, { useState } from 'react';
import { appContextStateType, appContextType } from '../utils/interfaces';

const AppContext = React.createContext<appContextStateType>([
    // @ts-ignore
  {}, () => {
  },
]);

export const AppProvider = ({ children }:any) => {
  const [state, setState] = useState<appContextType>({
    language: 'fa',
    back: {
      status: false,
      page: '',
    },
  });

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

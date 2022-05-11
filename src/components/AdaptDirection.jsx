import React from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import useIsLtr from '../hooks/useIsLtr';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

const cacheLtr = createCache({
  key: 'muiltr',
  stylisPlugins: [],
});

export default function (props) {
  const isLtr = useIsLtr();
  return (
    <CacheProvider value={!isLtr ? cacheLtr : cacheRtl}>
      {props.children}
    </CacheProvider>
  );
}

// export const Float = !isRtl ? 'left' : 'right';
//
// export const numType = !isRtl ? ' ' : 'enNum';

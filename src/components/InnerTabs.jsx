import React, { useContext, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import AppContext from '../contexts/AppContext';
import useIsLtr from '../hooks/useIsLtr';
import AdaptDirection from './AdaptDirection';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div

      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
}

export default (props) => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const [globState, setGlobState] = useContext(AppContext);
  const handleChange = (newValue) => {
    setValue(Math.max(newValue, 0));
    console.log('Math.max(index, 0) : ', Math.max(newValue, 0));
  };

  const handleChangeIndex = (index) => {
    setValue(Math.max(index, 0));
  };

  const isLtr = useIsLtr();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (props.defalutSlide) {
        setValue(props.defalutSlide);
      }
      if (globState.tabValue) {
        const myDiv = document.getElementById('tabContainer');
        myDiv.scrollTop = 0;
        setValue(globState.tabValue.value);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [globState]);

  return (
    <div id="tabContainer">
      <AdaptDirection>
        <Tabs
          data-tut="tabRowSecrtion"
          className="satrexTabs"
          value={value}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          classes={props.tabsClasses}
        >
          {
            props.tabItems.map((item, index) => (
              <Tab
                className="satrexTab"
                classes={props.tabClasses}
                key={index}
                label={item.title}
                onClick={() => handleChange(index)}
              />
            ))
          }
        </Tabs>
      </AdaptDirection>
      <SwipeableViews
        axis={isLtr ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {
          props.tabItems.map((item, index) => (
            <TabPanel value={value} key={index} index={index} dir={isLtr ? 'ltr' : 'rtl'}>
              <div data-tut="tabBodySection">
                {item.content}
              </div>
            </TabPanel>
          ))
        }
      </SwipeableViews>
    </div>
  );
};

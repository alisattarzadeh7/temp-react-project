import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import MasterScreen from '../screens/MasterScreen';
import AnimatedPage from '../components/AnimatedPage';
import Slider from "../components/slider";

const Home = React.lazy(() => import('../screens/Main'));
const Profile = React.lazy(() => import('../screens/Profile'));
const Settings = React.lazy(() => import('../screens/Settings'));

export const routes = [
  { path: '/setting', component: Settings, slider: false },
  { path: '/home', component: Home, slider: false },
  { path: '/profile', component: Profile, slider: true },
];

export default () => (
  <>
    <MasterScreen>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      {
        routes.map(({ path, component: Component, slider }, index) => (
          <Route path={path} exact key={path}>
            <AnimatedPage>
              {slider && <Slider />}
              <Component />
            </AnimatedPage>
          </Route>
        ))
      }
    </MasterScreen>
  </>
);

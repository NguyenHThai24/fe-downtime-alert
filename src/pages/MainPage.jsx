/** @format */

import React from 'react';
import AlertStopline from './LHG/AlertStopline';
import AlertDowntime from './LHG/AlertDowntime';

const MainPage = () => {
  return (
    <div className="grid grid-cols-2">
      <AlertDowntime />
      <AlertStopline />
    </div>
  );
};

export default MainPage;

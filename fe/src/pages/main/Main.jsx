import React from 'react';
import style from './Main.module.css';
import LeftContainer from './leftContainer/LeftContainer';
import RightContainer from './rightContainer/RightContainer';
import { FiltersProvider } from '../../components/context/FiltersContext';

const Main = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.subContainer}>
        <FiltersProvider>
          <LeftContainer />
        </FiltersProvider>
        <RightContainer />
      </div>
    </div>
  );
};

export default Main;

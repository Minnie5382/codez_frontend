import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import style from './Layout.module.css';
import Logo from '../logo/Logo';

const Layout = ({ children }) => {
  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style.content}>
        <Logo />
        {children}
      </div>
    </div>
  );
};

export default Layout;

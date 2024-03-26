import React from 'react';
import style from './Logo.module.css';
import logo from '../../images/logo.png';

const Logo = () => {
  return (
    <div className={style.logoBox}>
      <img src={logo} alt='logo' className={style.logo} />
      <p>codeZ</p>
    </div>
  );
};

export default Logo;

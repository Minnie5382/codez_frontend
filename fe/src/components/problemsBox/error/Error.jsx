import React from 'react';
import style from './Error.module.css';

const Error = ({ error, retryFetch }) => {
  return (
    <div className={style.errorContainer}>
      <p className={style.errorMessage}>
        문제를 불러오는 중 오류가 발생했습니다.
      </p>
      <p className={style.errorDetail}>{error.message}</p>
      <button className={style.retryButton} onClick={retryFetch}>
        다시 시도
      </button>
    </div>
  );
};

export default Error;

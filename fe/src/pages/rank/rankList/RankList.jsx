import React from 'react';
import style from '../Rank.module.css';

const RankList = ({ ranker }) => {
  return (
    <div className={style.rankList}>
      <h3>{ranker.ranking}</h3>
      <div className={style.userContainer}>
        <div className={style.userInfo}>
          <img src={ranker.profileImg} alt='Profile' />
          <div className={style.userBox}>
            <div className={style.level}>
              <p>Lv.{ranker.level}</p>
              <span className={style.tear}>{ranker.rank}</span>
            </div>
            <div className={style.name}>
              <p>{ranker.nickname}</p>
              <p>코더님</p>
            </div>
          </div>
        </div>
        <div>
          <p>{ranker.exp}exp</p>
        </div>
      </div>
    </div>
  );
};

export default RankList;

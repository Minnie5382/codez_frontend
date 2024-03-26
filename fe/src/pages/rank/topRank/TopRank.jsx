import React from 'react';
import style from '../Rank.module.css';

import firstMedal from '../../../images/medal_1st.png';
import secondMedal from '../../../images/medal_2nd.png';
import thirdMedal from '../../../images/medal_3rd.png';

const TopRank = ({ ranker }) => {
  const medalImage =
    ranker.ranking === 1
      ? firstMedal
      : ranker.ranking === 2
      ? secondMedal
      : ranker.ranking === 3
      ? thirdMedal
      : null;

  return (
    <div className={style.topRankList}>
      <img
        src={ranker?.profileImg}
        alt='Profile'
        className={style.profileImg}
      />
      <div className={style.topRankUser}>
        <p>{ranker.nickname} 코더님</p>
        <div className={style.level}>
          <span className={style.tear}>{ranker.rank}</span>
          <p>Lv.{ranker.level}</p>
        </div>
        <p>Exp {ranker.exp}</p>
      </div>
      {medalImage && (
        <img src={medalImage} alt='Medal' className={style.medal} />
      )}
    </div>
  );
};

export default TopRank;

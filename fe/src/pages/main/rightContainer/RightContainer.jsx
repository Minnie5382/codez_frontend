import { Link } from 'react-router-dom';
import style from '../Main.module.css';
import React from 'react';
import QuestItem from './questItem/QuestItem';
import axios from 'axios';
import { useQuery } from 'react-query';

const RightContainer = () => {
  const fetchQuests = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/quests');
      return response.data;
    } catch (error) {
      throw new Error('퀘스트를 가져오는 데 실패했습니다.');
    }
  };

  const { data, error, isLoading } = useQuery('quests', fetchQuests);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  const questList = data?.result?.questList ?? [];

  const dailyQuests = questList
    .filter((quest) => quest.type === 'DAILY')
    .slice(0, 3);
  const weeklyQuests = questList
    .filter((quest) => quest.type === 'WEEKLY')
    .slice(0, 3);

  return (
    <div className={style.rightContainer}>
      <div className={style.questBox}>
        <div className={style.quest}>
          <p>퀘스트</p>
          <hr />
        </div>
        <div className={style.dailyQuest}>
          <p>일일 퀘스트</p>
          <div className={style.questList}>
            {dailyQuests.map((quest) => (
              <QuestItem key={quest.id} quest={quest} />
            ))}
          </div>
          <hr />
        </div>
        <div className={style.weeklyQuest}>
          <p>주간 퀘스트</p>
          <div className={style.questList}>
            {weeklyQuests.map((quest) => (
              <QuestItem key={quest.id} quest={quest} />
            ))}
          </div>
        </div>
        <Link to={'/quest'}>더보기</Link>
      </div>
    </div>
  );
};

export default RightContainer;

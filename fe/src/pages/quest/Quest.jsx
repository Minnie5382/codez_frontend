import React from 'react';
import style from './Quest.module.css';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import QuestItem from './questItem/QuestItem';

const Quests = () => {
  const queryClient = useQueryClient();
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

  const handleCompleteAll = async () => {
    const questIdsToComplete = questList
      .filter((quest) => quest.clear && !quest.done)
      .map((quest) => quest.id);
    console.log(questIdsToComplete);
    if (questIdsToComplete.length === 0) {
      alert('완료 가능한 퀘스트가 없습니다.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/quests/complete',
        {
          questIdList: questIdsToComplete,
        }
      );
      queryClient.invalidateQueries('quests');
      console.log('모든 퀘스트 완료 처리 성공', response.data);
    } catch (error) {
      console.error('퀘스트 완료 처리 중 에러 발생:', error);
    }
  };

  const dailyQuestsIdsToComplete = dailyQuests
    .filter((quest) => quest.clear && !quest.done)
    .map((quest) => quest.id);

  const dailyButtonClass =
    dailyQuestsIdsToComplete.length > 0 ? style.buttonClear : '';

  const weeklyQuestsIdsToComplete = weeklyQuests
    .filter((quest) => quest.clear && !quest.done)
    .map((quest) => quest.id);

  const weeklyButtonClass =
    weeklyQuestsIdsToComplete.length > 0 ? style.buttonClear : '';

  return (
    <div className={style.mainContainer}>
      <div className={style.questContainer}>
        <div>
          <div className={style.questHeader}>
            <h2>일일 퀘스트</h2>
            <button
              className={dailyButtonClass}
              onClick={handleCompleteAll}
              disabled={dailyQuestsIdsToComplete.length === 0}
            >
              모두 완료
            </button>
          </div>
          <hr />
          <ul className={style.questList}>
            {dailyQuests.map((quest) => (
              <QuestItem key={quest.id} quest={quest} />
            ))}
          </ul>
        </div>
        <div>
          <div className={style.questHeader}>
            <h2>주간 퀘스트</h2>
            <button
              className={weeklyButtonClass}
              onClick={handleCompleteAll}
              disabled={weeklyQuestsIdsToComplete.length === 0}
            >
              모두 완료
            </button>
          </div>
          <hr />
          <ul className={style.questList}>
            {weeklyQuests.map((quest) => (
              <QuestItem key={quest.id} quest={quest} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Quests;

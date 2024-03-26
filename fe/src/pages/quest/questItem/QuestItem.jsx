import React, { useState } from 'react';
import style from '../Quest.module.css';
import questImg from '../../../images/questImg.png';
import questCompleteImg from '../../../images/questCompleteImg.svg';
import axios from 'axios';

const QuestItem = ({ quest }) => {
  const { id, name, clear, description, exp, done } = quest;
  const [completed, setCompleted] = useState(false);

  const questImgSrc = done || completed ? questCompleteImg : questImg;
  const buttonClass = clear || done ? style.buttonClear : '';
  const isButtonDisabled = !clear || done || completed;
  const buttonText = done
    ? '획득 완료'
    : completed
    ? '획득 완료'
    : clear
    ? '퀘스트 완료'
    : '미완료';

  const handleComplete = async () => {
    if (done) {
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:3001/api/quests/complete',
        {
          questIdList: [id],
        }
      );

      if (response.data.isSuccess) {
        console.log('퀘스트 완료', response.data);
        setCompleted(true);
      } else {
        console.error('퀘스트 완료 처리 실패:', response.data);
      }
    } catch (error) {
      console.error('퀘스트 완료 처리 중 에러 발생:', error);
    }
    console.log('클릭');
  };

  return (
    <li>
      <div className={style.description}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>EXP : {exp}</p>
        <button
          className={buttonClass}
          disabled={isButtonDisabled}
          onClick={handleComplete}
        >
          {buttonText}
        </button>
      </div>
      <img src={questImgSrc} alt='Quest' />
    </li>
  );
};

export default QuestItem;

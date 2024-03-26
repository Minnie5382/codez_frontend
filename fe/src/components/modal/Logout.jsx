import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../modal/Modal.module.css';
import { useQueryClient } from 'react-query';

const LogoutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const confirmLogout = window.confirm('정말로 로그아웃 하시겠습니까?');

    if (confirmLogout) {
      try {
        // 서버에 로그아웃 요청
        await axios.post('http://localhost:3001/api/auth/logout', null, {
          withCredentials: true, // 쿠키를 포함하여 요청 보내기
        });

        // 클라이언트에서 세션 관련 데이터 삭제
        localStorage.removeItem('isLoggedIn'); // 로그인 상태 삭제
        localStorage.removeItem('userInfo'); // 사용자 정보 삭제
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('isAuth');

        queryClient.clear();
        navigate('/');
      } catch (error) {
        console.error('로그아웃 실패:', error);
        // 로그아웃 실패 시 처리할 로직 추가
      }
    }
  };

  return (
    <button className={style.logout_btn} onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;

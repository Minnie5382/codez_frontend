import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Sidebar.module.css";
import Modal from "../modal/Modal";
import axios from "axios";
import { useQuery } from "react-query";
import ExperienceBar from "./ExperienceBar";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?.userId;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [userInfo, setUserInfo] = useState(null);

  const getUserData = () => {
    return axios.get(`http://localhost:3001/api/users/${userId}/profile`, {
      withCredentials: true,
    });
  };
  const {
    isLoading,
    data: USER,
    isError,
    error,
  } = useQuery("user", getUserData);
  useEffect(() => {
    if (USER) {
      setUserInfo(USER.data.result);
    }
  }, [USER]);

  if (isLoading) return <>Loading...</>;
  if (isError) return "An error has occurred: " + error.message;
  // 데이터 로드 후에 실행되도록 함

  console.log(userInfo?.expMax);
  console.log(userInfo?.exp);

  return (
    <div className={style.sidebar}>
      <div className={style.userBox} onClick={openModal} userInfo>
        <img
          className={style.userImg}
          src={userInfo?.profileImage}
          alt="user"
        />
        <div className={style.user}>
          <p>{userInfo?.rank}</p>
          <p>{userInfo?.nickname}</p>
          <p>코더님</p>
          <p>Lv.{userInfo?.level}</p>
          <ExperienceBar totalExp={userInfo?.expMax} currentExp={userInfo?.exp} />
        </div>
      </div>
      <div className={style.resultBox}>
        <div>
          <p>유저가 푼 문제 수</p>
          <span>{userInfo?.successProblemNum ?? 0}</span>
        </div>
        <div>
          <p>유저가 제출한 문제 수</p>
          <span>{userInfo?.submitProblemNum ?? 0}</span>
        </div>
      </div>
      <hr />
      <div className={style.linkBox}>
        <Link to="/main">문제</Link>
        <Link to="/quest">퀘스트</Link>
        <Link to="/rank">랭킹</Link>
      </div>
      {/* 모달을 렌더링합니다. isOpen과 closeModal props를 전달합니다. */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} userId={userId} />
    </div>
  );
};
export default Sidebar;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import style from "./Modal.module.css";
import axios from "axios";
import ExperienceBar from "../sidebar/ExperienceBar";
import LogoutButton from '../modal/Logout'

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검은 배경색 */
  z-index: 1000; /* 모달 위에 위치하도록 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  @import url ("./Modal.module.css");
`;

const Modal = ({ isOpen, closeModal, userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleWrapperClick = () => {
    closeModal();
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/users/${userId}/profile`
        );
        setProfileData(response.data.result);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("프로필 데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };

    if (isOpen) {
      fetchUserProfile();
    }
  }, [isOpen, userId]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleProfileIntroduceChange = (event) => {
    setProfileData((prevData) => ({
      ...prevData,
      profileIntroduce: event.target.value,
    }));
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "비밀번호는 최소 8자 이상이며, 대문자와 숫자를 적어도 하나 이상 포함해야 합니다."
      );
      return false;
    }

    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return false;
    }

    return true;
  };
  const handleSavePassword = async () => {
    if (!validatePassword()) {
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/users/profile/edit", {
        password,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  const handleSaveProfile = async () => {
    try {
      await axios.post("http://localhost:3001/api/users/profile/edit", {
        profileIntroduce: profileData.profileIntroduce,
      });
      alert("프로필이 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("프로필 저장 중 오류가 발생했습니다.");
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileSizeInBytes = file.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      const allowedExtensions = ["png", "jpg", "jpeg"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (fileSizeInMB > 2) {
        alert("이미지 크기는 2MB 이하여야 합니다.");
        return;
      }

      if (!allowedExtensions.includes(fileExtension)) {
        alert("이미지 파일 형식은 PNG, JPG, JPEG만 허용됩니다.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          "http://localhost:3001/api/users/profile/edit",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setProfileData((prevData) => ({
          ...prevData,
          profileImage: response.data.profileImage,
        }));

        alert("프로필 이미지가 성공적으로 변경되었습니다.");
        event.target.value = null;
      } catch (error) {
        console.error("Error uploading profile image:", error);
        alert("프로필 이미지 업로드 중 오류가 발생했습니다.");
      }
    }
  };

  if (!profileData) {
    return null;
  }

  if (!isOpen) return null;
  return (
    <>
      {isOpen && (
        <ModalWrapper onClick={handleWrapperClick}>
          <ModalBox onClick={handleModalClick}>
            <div className={style.modal_box}>
              <div className={style.modify_content}>
                <div className={style.modify_img}>
                  <img
                    className={style.img}
                    src={profileData?.profileImage}
                    alt=""
                  />
                  <button
                    className={style.modify_img_btn}
                    onClick={() =>
                      document.getElementById("imageInput").click()
                    }
                  >
                    이미지 변경
                  </button>
                  <input
                    id="imageInput"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
                <div className={style.modifys}>
                  <div className={style.modify_title}>
                    Rank : {profileData?.rank}
                  </div>
                  <div className={style.modify_nickname}>
                    닉네임 : {profileData?.nickname}
                  </div>
                  <div className={style.lv_info}>Lv.{profileData?.level}</div>
                  <div style={{width: '95%'}}>
                   <ExperienceBar totalExp={profileData?.expMax} currentExp={profileData?.exp}/>
                  </div>
                  <div className={style.password_box}>
                    <input
                      type="password"
                      placeholder="비밀번호"
                      className={style.password}
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <input
                      type="password"
                      placeholder="비밀번호 확인"
                      className={style.password_check}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                  </div>
                  <button
                    type="button"
                    className={style.password_change_btn}
                    onClick={handleSavePassword}
                  >
                    비밀번호 변경
                  </button>
                  <LogoutButton/>
                </div>
              </div>
              <div className={style.profile_content}>
                <div className={style.profile_content_value}>
                  <h3>프로필 내용</h3>
                  <textarea
                    value={profileData?.profileIntroduce}
                    onChange={handleProfileIntroduceChange}
                  ></textarea>
                </div>
                <button
                  type="button"
                  className={style.profile_save_btn}
                  onClick={handleSaveProfile}
                >
                  프로필 저장하기
                </button>
              </div>
            </div>
          </ModalBox>
        </ModalWrapper>
      )}
    </>
  );
};

export default Modal;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from 'react-query';
import style from './SignUp.module.css';
import logo from '../../images/logo.png';

const signUp = async (userDetails) => {
  const { data } = await axios.post(
    'http://localhost:3001/api/auth/register',
    userDetails
  );
  return data;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation(signUp, {
    onSuccess: (data) => {
      alert(data.message);
      navigate('/');
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
      alert(`회원가입에 실패했습니다: ${errorMessage}`);
    },
  });

  const handleNicknameChange = (event) => setNickname(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const validateForm = () => {
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{3,10}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!nicknameRegex.test(nickname)) {
      alert('닉네임은 3~10자의 알파벳 대소문자, 숫자, 한글이어야 합니다.');
      return false;
    }
    if (!emailRegex.test(email)) {
      alert('유효하지 않은 이메일 형식입니다.');
      return false;
    }
    if (!passwordRegex.test(password)) {
      alert(
        '비밀번호는 최소 8자 이상이며, 대문자와 숫자를 적어도 하나 이상 포함해야 합니다.'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      mutation.mutate({ nickname, email, password });
    }
  };

  return (
    <div className={style.signUp}>
      <div>
        <img src={logo} alt='로고' className={style.logo} />
      </div>
      <h2>
        <span className={style.font}>codeZ</span> 에 가입하고
        <br />
        문제를 풀어보세요!
      </h2>

      <form className={style.signUpForm} onSubmit={handleSubmit}>
        <label className={style.name}>
          닉네임
          <input
            type='text'
            aria-label='닉네임'
            value={nickname}
            onChange={handleNicknameChange}
          />
        </label>

        <label className={style.email}>
          이메일
          <input
            type='text'
            aria-label='이메일'
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label className={style.password}>
          비밀번호
          <input
            type='password'
            aria-label='비밀번호'
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <div className={style.btnBox}>
          <div>
            <Link to={'/'}>이미 회원이신가요?</Link>
          </div>
          <button type='submit' className={style.signUpBtn}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

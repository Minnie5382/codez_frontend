import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './SignIn.module.css';
import logo from '../../images/logo.png';
import { useMutation, useQueryClient } from 'react-query';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();

  const { mutate: signIn } = useMutation(
    async () => {
      const response = await axios.post(
        'http://localhost:3001/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          const { userId } = response.data.result;
          sessionStorage.setItem('userData', JSON.stringify({ userId }));
          queryClient.setQueryData('authCheck', { isSuccess: true });
          navigate('/');
        } else {
          alert(response.data.message);
        }
      },

      onError: (error) => {
        console.error(
          '로그인 실패:',
          error.response?.data?.message ||
            '로그인에 실패했습니다. 다시 시도해주세요.'
        );
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn();
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return (
    <div className={style.signIn}>
      <div>
        <img src={logo} alt='로고' className={style.logo} />
      </div>
      <h2>
        <span className={style.font}>codeZ</span> 에 로그인하고
        <br />
        문제를 풀어보세요!
      </h2>

      <form className={style.signInForm} onSubmit={handleSubmit}>
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
          <button type='submit' className={style.signInBtn}>
            로그인
          </button>
        </div>
      </form>
      <p>
        계정이 없다면,&nbsp;
        <Link to='/signUp'>
          <span className={style.point}>codeZ</span>에 가입하기
        </Link>
      </p>
    </div>
  );
};

export default SignIn;

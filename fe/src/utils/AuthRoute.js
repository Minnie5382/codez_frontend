import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const checkAuth = async () => {
  try {
    const { data } = await axios.get('http://localhost:3001/admin/check');
    sessionStorage.setItem('isAuth', data.isSuccess ? 'true' : 'false');
    return data.isSuccess;
  } catch (error) {
    sessionStorage.setItem('isAuth', 'false');
    return false;
  }
};

function AuthRoute({ children, isAuthRequired }) {
  const isAuthFromStorage = sessionStorage.getItem('isAuth') === 'true';
  const [isAuthorized, setIsAuthorized] = useState(isAuthFromStorage);

  useQuery('authCheck', checkAuth, {
    onSuccess: (isSuccess) => {
      sessionStorage.setItem('isAuth', isSuccess ? 'true' : 'false');
      setIsAuthorized(isSuccess);
    },
    onError: () => {
      sessionStorage.setItem('isAuth', 'false');
      setIsAuthorized(false);
    },

    enabled: !isAuthFromStorage,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
    refetchOnWindowFocus: true,
  });

  if (isAuthRequired && !isAuthorized) {
    return <Navigate to='/' replace />;
  }

  if (!isAuthRequired && isAuthorized) {
    return <Navigate to='/main' replace />;
  }

  return children;
}

export default AuthRoute;

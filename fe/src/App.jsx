import './App.css';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

import AuthRoute from './utils/AuthRoute';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import Layout from './components/layout/Layout';
import Main from './pages/main/Main';
import ProblemDetail from './pages/problemDetail/ProblemDetail';
import Quest from './pages/quest/Quest';
import Rank from './pages/rank/Rank';
import CreateProblem from './pages/createProblem/CreateProblem';

axios.defaults.withCredentials = true;
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          index
          element={
            <AuthRoute isAuthRequired={false}>
              <SignIn />
            </AuthRoute>
          }
        />
        <Route
          path='/signUp'
          element={
            <AuthRoute isAuthRequired={false}>
              <SignUp />
            </AuthRoute>
          }
        />
        <Route
          path='/main'
          element={
            <AuthRoute isAuthRequired={true}>
              <Layout>
                <Main />
              </Layout>
            </AuthRoute>
          }
        />
        <Route
          path='/problems/:problemId'
          element={
            <AuthRoute isAuthRequired={true}>
              <ProblemDetail />
            </AuthRoute>
          }
        />
        <Route
          path='/quest'
          element={
            <AuthRoute isAuthRequired={true}>
              <Layout>
                <Quest />
              </Layout>
            </AuthRoute>
          }
        />
        <Route
          path='/rank'
          element={
            <AuthRoute isAuthRequired={true}>
              <Layout>
                <Rank />
              </Layout>
            </AuthRoute>
          }
        />
        <Route path='/admin/problems' element={<CreateProblem />} />
      </Routes>
    </QueryClientProvider>
  );
}
export default App;

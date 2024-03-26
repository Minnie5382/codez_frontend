import PaginationSize from '../../components/pagination/Pagination';
import style from './ProblemsBox.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFilters } from '../context/FiltersContext';
import { useQuery } from 'react-query';
import Error from './error/Error';
import { useState } from 'react';

const ProblemsBox = ({ searchQuery }) => {
  const { filters } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 10;

  const fetchProblems = async (filters) => {
    const {
      solvingStatus,
      difficulty,
      title,
      limit = 10,
      pageNum = 1,
    } = filters;

    const queryString = `solvingStatus=${solvingStatus}&difficulty=${difficulty}&title=${title}&limit=${limit}&pageNum=${pageNum}`;
    const url = `http://localhost:3001/api/problems?${queryString}`;
    const { data } = await axios.get(url, {
      withCredentials: true,
    });
    return data;
  };

  const { data, isLoading, error, refetch } = useQuery(
    ['problems', filters],
    () => fetchProblems(filters),
    {
      refetchOnWindowFocus: true,
    }
  );

  if (isLoading) return <div className={style.loading}>Loading...</div>;
  if (error) return <Error error={error} retryFetch={refetch} />;

  const problemList = data?.result?.problemList || [];

  const filteredProblems = problemList.filter((problem) => {
    const matchesFilters =
      (!filters.difficulty || problem.difficulty === filters.difficulty) &&
      (!filters.language || problem.language === filters.language) &&
      (!filters.type || problem.type === filters.type);
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchQuery?.toLowerCase() || '');
    return matchesFilters && matchesSearch;
  });

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;

  const currentProblems = filteredProblems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  );

  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

  return (
    <div className={style.problemsBox}>
      <div className={style.postsHeader}>
        <div className={style.postAttribute}>상태</div>
        <div className={style.postTitle}>제목</div>
        <div className={style.postAttribute}>정답률</div>
        <div className={style.postAttribute}>난이도</div>
        <div className={style.submissionCount}>제출수</div>
      </div>
      <div className={style.postsList}>
        {currentProblems.map((post) => (
          <Link
            key={post.problemId}
            to={`/problems/${post.problemId}`}
            className={style.postRow}
          >
            <div className={style.postAttribute}>{post.status}</div>
            <div className={style.postTitle}>{post.title}</div>
            <div className={style.postAttribute}>{post.correctRate}</div>
            <div className={style.postAttribute}>{post.difficulty}</div>
            <div className={style.submissionCount}>{post.submitNum}</div>
          </Link>
        ))}
      </div>
      <div className={style.paginationContainer}>
        <PaginationSize
          currentPage={currentPage}
          setPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default ProblemsBox;

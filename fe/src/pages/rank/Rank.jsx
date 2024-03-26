import React, { useEffect, useRef } from 'react';
import style from './Rank.module.css';
import TopRank from './topRank/TopRank';
import RankList from './rankList/RankList';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

const fetchRankers = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `http://localhost:3001/api/users/rankings?page=${pageParam}&size=10`
  );
  return response.data.result;
};

const Rank = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery('rankers', fetchRankers, {
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
  });

  const rankContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!rankContainerRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } =
        rankContainerRef.current;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    const rankContainer = rankContainerRef.current;
    if (rankContainer) {
      rankContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (rankContainer) {
        rankContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred: {error.message}</div>;

  const allRankers = data?.pages.flatMap((page) => page.content) || [];

  const topRankers = allRankers.slice(0, 3);

  const otherRankers = allRankers.slice(3);

  return (
    <article className={style.rankBox}>
      <div className={style.rankContainer} ref={rankContainerRef}>
        <div className={style.topRank}>
          {topRankers.map((ranker, index) => (
            <TopRank key={index} ranker={ranker} />
          ))}
        </div>
        <div className={style.rank}>
          {otherRankers.map((ranker, index) => (
            <RankList key={index} ranker={ranker} />
          ))}
        </div>
        {isFetchingNextPage && hasNextPage && <div>Loading more...</div>}
      </div>
    </article>
  );
};

export default Rank;

import { EntityState } from '@reduxjs/toolkit';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { usePostArg } from 'state/home/hooks';

import { postInitialState, useGetPostsQuery, useGetUsersQuery, userInitialState } from '../state/api';
import { IPost } from '../types/getPostsApi';

const retrieveUserIdsFromPosts = (posts: EntityState<IPost>) => {
  // postsレスポンスからuserIdを取り出す
  const rawUserIds = Object.values(posts.entities).map((post) => post?.author);
  // Setオブジェクトを介して重複分を削除
  const uniqueUserIds = new Set(rawUserIds);
  // 配列を介してstring型に変換
  const userIds = Array.from(uniqueUserIds).toString();

  return userIds;
};

export const usePostsAndUsers = () => {
  const postArg = usePostArg();
  const { data: posts = postInitialState, refetch } = useGetPostsQuery(postArg);

  const {
    data: users = userInitialState,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery(posts ? retrieveUserIdsFromPosts(posts) : skipToken);

  return {
    posts,
    users,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
  };
};

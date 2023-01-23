import { Avatar, Box, Card, CardContent } from '@mui/material';
import { lightGreen } from '@mui/material/colors';
import { EntityId } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import { postsSelectors, usersSelectors } from '../../../state/api';
import { useAppSelector } from '../../../state/hooks';
import HashTag from '../HashTag';
import ReactionBtns from '../ReactionBtns';

interface Props {
  postId: EntityId;
  className?: string;
  onClick?: () => void;
}

const PostPreview: React.FunctionComponent<Props> = (props) => {
  const { postId, className, onClick } = props;

  // Hookでのデータ取得
  // const { data: post } = useGetPostsQuery(undefined, {
  //   selectFromResult: ({ data, error, isLoading, isFetching }) => ({
  //     data: data?.entities[postId],
  //     error,
  //     isLoading,
  //     isFetching,
  //   }),
  // });

  // EntityAdapter Selectors でのデータ取得
  const post = useAppSelector((state) => postsSelectors.selectById(state, postId));
  const user = useAppSelector((state) => (post ? usersSelectors.selectById(state, post?.author) : undefined));

  return (
    <Card
      sx={[{ width: '100%' }, { boxShadow: 'none' }, { '&:hover': { bgcolor: lightGreen[50], cursor: 'pointer' } }]}
      className={className}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Avatar sx={{ bgcolor: 'pink', mr: 1 }}>{user?.name}</Avatar>
            <div>
              <div>{user?.name}</div>
              <div>{dayjs(post?.created_at).format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
          </Box>
          <ReactionBtns reactionsCount={post?.reactions}></ReactionBtns>
        </Box>

        <Box sx={{ minHeight: 100, p: 2 }}>{post?.content}</Box>
        <Box sx={{ display: 'flex' }}>
          {post?.hashTags.map((tag, i) => {
            return <HashTag label={tag} key={i}></HashTag>;
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostPreview;

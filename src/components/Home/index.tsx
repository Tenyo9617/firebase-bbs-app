import { Alert, Container, Skeleton } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

import { usePostsAndUsers } from '../../hooks/usePostsAndUsers';
import { useModalIsOpen } from '../../state/home/hooks';
import { ApplicationModal } from '../../state/home/reducer';
import CreatePostModal from './CreatePostModal';
import DetailPostModal from './DetailPostModal';
import Header from './Header';
import PostPreview from './PostPreview';

const App: React.FC = () => {
  const isCreatePostModalOpen = useModalIsOpen(ApplicationModal.CREATE_POST_MODAL);
  const [isDetailPostModalOpen, setIsDetailPostModalOpen] = useState(false);

  const { posts, isSuccess, isLoading, isError, error, refetch } = usePostsAndUsers();
  const handleDetailPostModalOpen = () => {
    setIsDetailPostModalOpen((prev) => !prev);
  };

  const getContent = () => {
    if (isLoading) {
      return <Skeleton animation="wave" data-testid="loading-skeleton" />;
    } else if (isSuccess) {
      return (
        <Container maxWidth="xl">
          {posts.ids.map((id) => (
            <StyledPostPreview postId={id} onClick={handleDetailPostModalOpen} key={id} />
          ))}
        </Container>
      );
    } else if (isError && error) {
      if ('status' in error) {
        return (
          <Alert variant="filled" severity="error">
            An error has occurred:
            {error.status}
          </Alert>
        );
      } else {
        // you can access all properties of `SerializedError` here
        return <div>{error.message}</div>;
      }
    }
  };

  return (
    <div className="App">
      <Header />
      {getContent()}
      {isCreatePostModalOpen && <CreatePostModal />}
      {isDetailPostModalOpen && <DetailPostModal handleDetailPostModalOpen={handleDetailPostModalOpen} />}
    </div>
  );
};

const StyledPostPreview = styled(PostPreview)`
  margin-bottom: 10px;
`;

export default App;

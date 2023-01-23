import { Avatar, Box } from '@mui/material';
import styled from 'styled-components';

interface Props {
  user: {
    userName: string;
  };
  content: string;
}

const Comment: React.FunctionComponent<Props> = (props) => {
  const {
    user: { userName },
    content,
  } = props;
  return (
    <>
      <Box mt={2} sx={{ display: 'flex' }}>
        <Avatar sx={{ mr: 3 }}>{userName}</Avatar>
        <Balloon>
          <div>{content}</div>
        </Balloon>
      </Box>
    </>
  );
};

const Balloon = styled.div`
  position: relative;
  margin: 0;
  border: 1px solid #9e9e9e;
  border-radius: 8px;
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: -22px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right: 12px solid #9e9e9e;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: -20px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right: 11px solid #fff;
  }

  > div {
    padding: 8px;
    max-height: 140px;
    overflow-y: auto;
  }
`;

export default Comment;

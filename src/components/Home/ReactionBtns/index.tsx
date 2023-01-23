import { faComment, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, IconButton } from '@mui/material';
import styled from 'styled-components';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`;

interface Prop {
  reactionsCount?: {
    thumbsUp: number;
    heart: number;
    commentsCount: number;
  };
}

const ReactionBtns: React.FunctionComponent<Prop> = (props) => {
  // reactionsCountがundefinedの場合の既定値を設定する
  const {
    reactionsCount = {
      thumbsUp: 0,
      heart: 0,
      commentsCount: 0,
    },
  } = props;

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton>
        <StyledFontAwesomeIcon icon={faThumbsUp} />
        {reactionsCount.thumbsUp}
      </IconButton>
      <IconButton>
        <StyledFontAwesomeIcon icon={faHeart} />
        {reactionsCount.heart}
      </IconButton>
      <IconButton>
        <StyledFontAwesomeIcon icon={faComment} />
        {reactionsCount.commentsCount}
      </IconButton>
    </Box>
  );
};

export default ReactionBtns;

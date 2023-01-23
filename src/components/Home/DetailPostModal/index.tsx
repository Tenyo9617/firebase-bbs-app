import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Dialog, DialogContent, DialogTitle, IconButton, Paper, PaperProps } from '@mui/material';
import Draggable from 'react-draggable';

import Comment from '../Comment';
import HashTag from '../HashTag';
import ReactionBtns from '../ReactionBtns';

const mockText =
  'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミー';

interface Prop {
  handleDetailPostModalOpen: () => void;
}

const DetailPostModal: React.FunctionComponent<Prop> = (props) => {
  const { handleDetailPostModalOpen } = props;

  const TempDraggable: any = Draggable;
  function PaperComponent(props: PaperProps) {
    return (
      <TempDraggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </TempDraggable>
    );
  }

  return (
    <Dialog
      open
      onClose={handleDetailPostModalOpen}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle id="draggable-dialog-title">Ten さんの投稿</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleDetailPostModalOpen}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </IconButton>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Avatar sx={{ bgcolor: 'pink', mr: 1 }}>W</Avatar>
          <ReactionBtns reactionsCount={{ thumbsUp: 0, heart: 0, commentsCount: 0 }} />
        </Box>
        <Box mt={2}>{mockText}</Box>
        <Box mt={2}>
          <HashTag label="aaa" />
          <HashTag label="bbb" />
        </Box>
        <Comment user={{ userName: 'AAA' }} content={mockText} />
      </DialogContent>
    </Dialog>
  );
};

export default DetailPostModal;

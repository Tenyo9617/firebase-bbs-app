import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  PaperProps,
  TextField,
} from '@mui/material';
import { doc } from 'firebase/firestore';
import Draggable from 'react-draggable';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Creatable from 'react-select/creatable';

import { db } from '../../../firebase';
import { useCloseModal } from '../../../state/home/hooks';
import { ApplicationModal } from '../../../state/home/reducer';

interface FormValues {
  content: string;
  tag: {
    value: string;
    label: string;
  };
}

const CreatePostModal: React.FC = () => {
  const closeModal = useCloseModal(ApplicationModal.CREATE_POST_MODAL);

  const TempDraggable: any = Draggable;
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      content: '',
      tag: { value: '旅行', label: '旅行' },
    },
  });
  function PaperComponent(props: PaperProps) {
    return (
      <TempDraggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} sx={{ width: '100%' }} />
      </TempDraggable>
    );
  }
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const testDocRef = doc(db, 'users', 'user1');
    console.log(testDocRef);

    closeModal();
  };

  return (
    <Dialog
      open
      onClose={closeModal}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      //selectのドロップダウンがすべて表示されるために設定する
      sx={{ '& .MuiPaper-root': { overflowY: 'visible' } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="draggable-dialog-title">投稿新規作成</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
        </IconButton>
        <DialogContent dividers sx={{ overflowY: 'visible' }}>
          <Box sx={{ display: 'flex' }}>
            <Avatar sx={{ bgcolor: 'pink', mr: 1 }}>W</Avatar>
            <Box sx={{ flex: 1 }}>
              <Controller
                render={({ field }) => (
                  <TextField {...field} multiline rows={4} fullWidth sx={{ mb: 2 }} placeholder="なにかをつぶやく..." />
                )}
                name="content"
                control={control}
              />
              <Controller
                name="tag"
                render={({ field }) => (
                  <Creatable
                    {...field}
                    isMulti
                    placeholder="タグをつけよう..."
                    options={[
                      { value: '旅行', label: '旅行' },
                      { value: 'グルメ', label: 'グルメ' },
                      { value: 'コーディング', label: 'コーディング' },
                    ]}
                  />
                )}
                control={control}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit">送信</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreatePostModal;

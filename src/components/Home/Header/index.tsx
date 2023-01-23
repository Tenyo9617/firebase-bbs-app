import { faCheese, faPenToSquare, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Button, Container, IconButton, Toolbar } from '@mui/material';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'state/hooks';

import { auth } from '../../../firebase';
import { useOpenModal } from '../../../state/home/hooks';
import { ApplicationModal, changePostArg } from '../../../state/home/reducer';
import { useUserState } from '../../../state/user/hooks';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const openModal = useOpenModal(ApplicationModal.CREATE_POST_MODAL);
  const userState = useUserState();
  const handleLogoutClicked = () => {
    signOut(auth);
  };
  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton sx={{ color: 'primary.contrastText' }} onClick={() => dispatch(changePostArg('1'))}>
              <FontAwesomeIcon icon={faCheese} />
            </IconButton>
            {userState.uid ? (
              <div>
                <Button variant="contained" sx={{ border: 1 }} onClick={openModal}>
                  <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: 4 }} />
                  投稿する
                </Button>
                <Button variant="contained" sx={{ border: 1, ml: 1 }} onClick={handleLogoutClicked}>
                  <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: 4 }} />
                  ログアウト
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="contained" sx={{ border: 1 }}>
                  <FontAwesomeIcon icon={faRightToBracket} style={{ marginRight: 4 }} />
                  ログイン
                </Button>
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;

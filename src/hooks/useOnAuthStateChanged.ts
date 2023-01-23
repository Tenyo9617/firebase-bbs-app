import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'state/hooks';
import { login, logout } from 'state/user/reducer';

import { auth } from '../firebase';

export const useOnAuthStateChanged = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const [lastDispatch, setLastDispatch] = useState();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged');

      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const email = user.email ?? '';
        const photoURL = user.photoURL ?? '';
        const displayName = user.displayName ?? '';
        dispatch(login({ uid, email, photoURL, displayName }));
        navigate('/', { replace: true });
      } else {
        dispatch(logout());
      }
    });
    return () => {
      console.log('unsub');

      unSub();
    };
  }, [dispatch, navigate]);
  // }, [dispatch]);
};

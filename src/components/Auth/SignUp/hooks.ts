import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../../firebase';

export const useCreateUserWithEmailAndPassword = (email: string, pw: string) => {
  createUserWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
    });
};

import { useAppSelector } from '../hooks';
import { AppState } from '../store';

export const useUserState = () => {
  const userState = useAppSelector((state: AppState) => state.user);
  return userState;
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

const initialState: UserState = {
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
    },
    logout: (state) => {
      state.uid = initialState.uid;
      state.email = initialState.email;
      state.displayName = initialState.displayName;
      state.photoURL = initialState.photoURL;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

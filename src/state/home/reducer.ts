import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ApplicationModal {
  CREATE_POST_MODAL,
  DETAIL_POST_MODAL,
}

export interface ApplicationState {
  readonly openModal: ApplicationModal | null;
  postArg: string;
}

const initialState: ApplicationState = {
  openModal: null,
  postArg: '',
};
const mainSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    changePostArg: (state, action: PayloadAction<string>) => {
      state.postArg = action.payload;
    },
  },
});

export const { setOpenModal, changePostArg } = mainSlice.actions;
export default mainSlice.reducer;

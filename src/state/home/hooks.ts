import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { AppState } from '../store';
import { ApplicationModal, setOpenModal } from './reducer';

export function useModalIsOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector((state: AppState) => state.application.openModal);
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const isOpen = useModalIsOpen(modal);
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setOpenModal(isOpen ? null : modal)), [dispatch, modal, isOpen]);
}

export function useOpenModal(modal: ApplicationModal): () => void {
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal]);
}

export function useCloseModal(_modal: ApplicationModal): () => void {
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setOpenModal(null)), [dispatch]);
}

export function useToggleCreatePostModal(): () => void {
  return useToggleModal(ApplicationModal.CREATE_POST_MODAL);
}

export function useToggleDetailPostModal(): () => void {
  return useToggleModal(ApplicationModal.DETAIL_POST_MODAL);
}

export const usePostArg = () => {
  const postArg = useAppSelector((state: AppState) => state.application.postArg);
  return postArg;
};

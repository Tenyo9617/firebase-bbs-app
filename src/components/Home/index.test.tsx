import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from 'utils/test-utils';

import Home from '.';

it('画面初回ロード', async () => {
  renderWithProviders(<Home />);
  // データ取得前：
  expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  screen.logTestingPlaygroundURL(screen.getByTestId('loading-skeleton'));

  expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument();
  // // after some time, the posts should be received
  expect(await screen.findByText(/post1!!/i)).toBeInTheDocument();
});
it('ポストカードクリック', async () => {
  renderWithProviders(<Home />);

  const postCard = await screen.findAllByTestId('post-card');
  // ACT
  await userEvent.click(postCard[0]);
  // ASSERT
  expect(screen.getByRole('heading', { name: /ten さんの投稿/i })).toBeInTheDocument();
});

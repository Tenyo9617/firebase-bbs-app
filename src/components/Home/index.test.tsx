import { fireEvent, screen } from '@testing-library/react';
import { handlers } from 'mocks/handlers';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { renderWithProviders } from 'utils/test-utils';

import Home from '.';
// const server = setupServer(...handlers);

// // Enable API mocking before tests.
// beforeAll(() => server.listen());

// // Reset any runtime request handlers we may add during the tests.
// afterEach(
//   () => server.resetHandlers()
//   // This is the solution to clear RTK Query cache after each test
//   // store.dispatch(apiSlice.util.resetApiState());
// );

// // Disable API mocking after the tests are done.
// afterAll(() => server.close());

it('fetches & receives a user after clicking the fetch user button', async () => {
  renderWithProviders(<Home />);

  // expect(screen.getByTestId('loading-skeleton')).toBe(true);

  // should show no user initially, and not be fetching a user
  // expect(screen.getByText(/no user/i)).toBeInTheDocument()
  // expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()

  // // after clicking the 'Fetch user' button, it should now show that it is fetching the user
  // fireEvent.click(screen.getByRole('button', { name: /Fetch user/i }))
  // expect(screen.getByText(/no user/i)).toBeInTheDocument()

  // // after some time, the user should be received
  expect(await screen.findByText(/aaa/i)).toBeInTheDocument();
  screen.debug();
  // expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()
  // expect(screen.queryByText(/Fetching user\.\.\./i)).not.toBeInTheDocument()
});

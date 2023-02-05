import '@testing-library/jest-dom';

import { api } from 'state/api';
import { setupStore } from 'state/store';

import { server } from './mocks/server';

const store = setupStore({});

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  store.dispatch(api.util.resetApiState());
});

// Clean up after the tests are finished.
afterAll(() => server.close());

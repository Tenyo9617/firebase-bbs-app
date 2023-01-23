import Root from 'components/Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signUp',
        element: <SignUp />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

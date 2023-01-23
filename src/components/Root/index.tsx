import { useOnAuthStateChanged } from 'hooks/useOnAuthStateChanged';
import { Outlet } from 'react-router-dom';

const Root: React.FC = () => {
  useOnAuthStateChanged();
  return <Outlet />;
};

export default Root;

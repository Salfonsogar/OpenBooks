import { Outlet } from 'react-router-dom';
import Reader from '../features/reader/Reader';

function ReaderLayout() {
  return (
    <Reader>
      <Outlet />
    </Reader>
  );
}

export default ReaderLayout;

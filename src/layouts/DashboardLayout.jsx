import { Outlet } from 'react-router-dom';
import NavbarAdmin from '../components/layout/NavbarAdmin';
import AdminNotifications from '../components/admin/AdminNotifications';

function DashboardLayout() {
  return (
    <>
      <NavbarAdmin />
      <AdminNotifications />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default DashboardLayout;

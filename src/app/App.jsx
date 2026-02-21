import { Suspense, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRolesAsync, selectAllRoles } from '../store/rolesSlice';
import { selectAuthUser } from '../store/authSlice';
import { routes, LoadingFallback } from './routes';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const roles = useSelector(selectAllRoles);

  useEffect(() => {
    dispatch(fetchRolesAsync());
  }, [dispatch]);

  const isAdmin = useMemo(() => {
    if (!user || !user.rolId || !roles.length) return false;
    const userRole = roles.find(r => r.id === user.rolId);
    return userRole && (userRole.name === 'Administrador' || userRole.name === 'Admin');
  }, [user, roles]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            element={route.element}
            children={route.children?.map((child, childIndex) => (
              <Route
                key={childIndex}
                index={child.index}
                path={child.path}
                element={child.element}
              />
            ))}
          />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;

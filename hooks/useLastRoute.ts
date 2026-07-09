import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'lastRoute';

export function useLastRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const restored = useRef(false);

  // Restore the last route once on app launch
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;

    const lastRoute = localStorage.getItem(STORAGE_KEY);
    const current = location.pathname + location.search;

    if (lastRoute && lastRoute !== current) {
      navigate(lastRoute, { replace: true });
    }
  }, [location, navigate]);

  // Keep saving the current route as the user navigates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, location.pathname + location.search);
  }, [location.pathname, location.search]);
}

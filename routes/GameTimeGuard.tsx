// GameTimeGuard.tsx
import { Navigate, Outlet } from "react-router-dom";

export default function GameTimeGuard() {
  const hour = new Date().getHours();

  // Allowed only from 12:00 PM (12) until 11:59 PM (23)
  const isAllowed = hour >= 12;

  if (!isAllowed) {
    return <Navigate to="/pinoy-games" replace />;
  }

  return <Outlet />;
}
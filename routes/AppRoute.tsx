import { Routes, Route } from "react-router-dom"; 
import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Disclaimer from "../features/auth/Disclaimer";
import Register from "../features/auth/Register";
import Reset from "../features/auth/Reset";
import BaseLayout from "../layouts/BaseLayout";
import Dashboard from "../features/dashboard/Dashboard";
import Profile from "../features/dashboard/pages/Profile";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import ProtectedRoute from "../routes/ProtectedRoute";

export default function AppRoutes() { 

  return ( 
    <Routes> 
      {/* Main Website */} 
      <Route path="/"  element={<BaseLayout />}> 
        <Route index element={<Home />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
      </Route> 

      {/* Protected Routes */}
      
{/* 
      FLOW -- Protected Route -> Render AuthenticatedLayout -> Access Routes 
      If not authenticated, redirect to login page */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AuthenticatedLayout />}>
          {/* // Dashboard and other protected routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />

        </Route>
      </Route> 
     

      {/* 404 */} 
      {/* <Route path="*" element={<NotFound />} /> */} 
    </Routes> 
  ); 
}
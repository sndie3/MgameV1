import DesktopLayout from "../layouts/DesktopLayout";
import { Routes, Route } from "react-router-dom"; 
import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Disclaimer from "../features/auth/Disclaimer";
export default function AppRoutes() { 

  return ( 
    <Routes> 
      {/* Main Website */} 
      <Route path="/"  element={<DesktopLayout />}> 
        <Route index element={<Home />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="login" element={<Login />} />
      </Route> 

      {/* Auth Routes */}
      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> */}

      {/* 404 */} 
      {/* <Route path="*" element={<NotFound />} /> */} 
    </Routes> 
  ); 
}
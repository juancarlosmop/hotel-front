import { LoginForm } from '../pages/auth/LoginForm'
import { RegisterForm } from '../pages/auth/RegisterForm'
import { AuthProvider } from '../context/AuthContext'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotAuthorized } from '../components/auth/NotAuthorized';
import { ProtectedRoute }  from '../components/auth/ProtectedRoute';
import { LayoutWithNavbar } from '../components/layout/LayoutWithNavbar';
import { Reservations } from '../pages/reservations/Reservations';
import { CrudRooms } from '../pages/rooms/CrudRooms';
import { HomePage } from '../pages/HomePage';

import { UserRoutes } from './UserRoutes';
import { AdminRoutes } from './AdminRoutes';
export const AppRouter=()=>{
     return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<LayoutWithNavbar/>}>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/" element={<HomePage/>}/>
            <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
                {UserRoutes()}
            </Route>
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                {AdminRoutes()}
            </Route>
          </Route>  
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  )
};
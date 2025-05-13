import './App.css'
import { LoginForm } from './pages/auth/LoginForm'
import { RegisterForm } from './pages/auth/RegisterForm'
import { AuthProvider } from './context/AuthContext'; 
import { ListRooms } from './pages/rooms/ListRooms'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotAuthorized } from './components/auth/NotAuthorized';
import { ProtectedRoute }  from './components/auth/ProtectedRoute';
import { LayoutWithNavbar } from './components/layout/LayoutWithNavbar';
import { RoomDetails } from './pages/rooms/RoomDetails';
import { ReservationSuccess } from './pages/reservations/ReservationSuccess';
import { UserReservations } from './pages/reservations/UserReservations';
import { Reservations } from './pages/reservations/Reservations';
import { CrudRooms } from './pages/rooms/CrudRooms';
import { HomePage } from './pages/HomePage';
import { AppRouter } from './routes/AppRouter';
function App() {
  return (
    <>
      <AppRouter/>
    </>
  )
}

export default App

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
export const Navbar = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const{ user,logout } = useAuth();
    const navigate =useNavigate();

    const handleLogOut =()=>{
        logout();
        navigate("/login")
    }


    return(
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link className="text-2xl font-bold text-blue-600" to="/">Hotel</Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            ☰
          </button>
        </div>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {user === null && (
            <>
              <li><Link to="/register" className="hover:text-blue-600">Register</Link></li>
              <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
            </>
          )}
          {user?.role === "ADMIN" && (
            <>
              <li><Link to="/scheduled-reservations" className="hover:text-blue-600">Reservations</Link></li>
              <li><Link to="/admin-rooms" className="hover:text-blue-600">Rooms Administration</Link></li>
              <li><div onClick={handleLogOut} className="hover:text-blue-600 cursor-pointer">Log Out</div></li>
            </>
          )}
          {user?.role === "USER" && (
            <>
              <li><Link to="/rooms" className="hover:text-blue-600">Rooms</Link></li>
              <li><Link to="/reservations" className="hover:text-blue-600">My Reservations</Link></li>
              <li><div onClick={handleLogOut} className="hover:text-blue-600 cursor-pointer">Log Out</div></li>
            </>
          )}
        </ul>
      </div>
      {isOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 text-gray-700 font-medium">
          {user === null && (
            <>
              <li><Link to="/register" className="block hover:text-blue-600">Register</Link></li>
              <li><Link to="/login" className="block hover:text-blue-600">Login</Link></li>
            </>
          )}
          {user?.role === "ADMIN" && (
            <>
              <li><Link to="/scheduled-reservations" className="block hover:text-blue-600">Reservations</Link></li>
              <li><Link to="/admin-rooms" className="block hover:text-blue-600">Rooms Administration</Link></li>
              <li><div onClick={handleLogOut} className="block hover:text-blue-600 cursor-pointer">Log Out</div></li>
            </>
          )}
          {user?.role === "USER" && (
            <>
              <li><Link to="/rooms" className="block hover:text-blue-600">Rooms</Link></li>
              <li><Link to="/reservations" className="block hover:text-blue-600">My Reservations</Link></li>
              <li><div onClick={handleLogOut} className="block hover:text-blue-600 cursor-pointer">Log Out</div></li>
            </>
          )}
        </ul>
      )}
    </nav>
    )

};
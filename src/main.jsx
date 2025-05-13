import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Asegúrate de importar el AuthProvider


createRoot(document.getElementById('root')).render(
  <App />
)

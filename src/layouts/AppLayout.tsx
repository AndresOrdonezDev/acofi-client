import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Spinnier from "../components/Spinner";


export default function AppLayout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleLogout = () => {
    // 1. Eliminar token
    localStorage.removeItem('token_acofi');

    // 2. Eliminar caché de la consulta 'user'
    queryClient.removeQueries({queryKey:['user']});

    // 3. Redirigir al login
    navigate('/auth/login');
  }

  const { data, isError, isLoading } = useAuth();
  
  if (isLoading) return <Spinnier marginTop="150px"/>;

  if (isError) {
    return <Navigate to={"/auth/login"} />;
  }
  if (data)
    return (
      <>
        <header className="h-16 shadow-md">
          <div className="flex items-center w-full justify-between  h-full px-10 font-semibold">
            <span>@{data.username}</span>
            <div className="flex items-center gap-5">
              <nav className="flex gap-10">
                <Link to={"/list"}>Mis consecutivos</Link>
                <Link to={"/listAll"}>Consultar consecutivo</Link>
              </nav>
              {data.isAdmin && (
                <Link to={'/auth/register'} className="bg-amber-600 text-white p-2 rounded-lg cursor-pointer hover:bg-amber-700 transition">
                  Nuevo Usuario
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="bg-teal-600 text-white p-2 rounded-lg cursor-pointer hover:bg-teal-700 transition">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </header>
        <Outlet />
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
    );
}

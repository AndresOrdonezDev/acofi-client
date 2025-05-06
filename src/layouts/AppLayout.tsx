import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Outlet, Link } from 'react-router-dom'

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()
    if (isLoading) return <p>Cargando...</p>

    if (isError) {
        return <Navigate to={'/auth/login'} />
    }
    if (data) return (
        <>
            <header className='h-16'>
                <div className='flex items-center w-full justify-between  h-full px-10 font-semibold'>
                    <span>@{data.username}</span>
                    <div className='flex items-center gap-10'>
                        <nav className='flex gap-10'>
                            <Link to={'/'}>Mis consecutivos</Link>
                            <Link to={'/'}>Consultar consecutivo</Link>
                        </nav>
                        <button
                            className='bg-teal-600 text-white p-2 rounded-lg cursor-pointer hover:bg-teal-700 transition'
                        >Cerrar Sesión</button>
                    </div>

                </div>
            </header>
            <Outlet />
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
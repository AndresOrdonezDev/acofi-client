import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import {Outlet} from  'react-router-dom'

export default function AuthLayout() {

    return(
        <>
            <Outlet/>
            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
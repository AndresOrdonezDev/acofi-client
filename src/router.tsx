import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardView from "./views/DashboardView";
import LoginView from "./views/auth/LoginView";
import ListConsecutive from "./views/consecutive/ListConsecutive";
import RegisterView from "./views/auth/RegisterView";
import ListAllConsecutive from "./views/consecutive/ListAllConsecutivey";


export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path='/' element={<DashboardView/>} index/>
                    <Route path='/list' element={<ListConsecutive/>} index/>
                    <Route path='/listAll' element={<ListAllConsecutive/>} index/>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<LoginView/>}></Route>
                    <Route path='/auth/register' element={<RegisterView/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
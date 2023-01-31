import { Outlet } from "react-router-dom"
import Clients from "../components/Clients"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout() {

    return (
        <div id="content">
            <Header />
            <ToastContainer />
            <Outlet />
            <Footer />
        </div>
    )
}

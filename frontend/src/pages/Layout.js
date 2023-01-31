import { Outlet } from "react-router-dom"
import Clients from "../components/Clients"
import Footer from "../components/Footer"
import Header from "../components/Header"

export default function Layout() {
    
    return (
        <div id="content">
            <Header />
            <Outlet/>
            <Footer />
        </div>
    )
}

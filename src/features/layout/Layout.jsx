import React from 'react'
import Navbar from '../shared/navBar/Navbar'
import { Outlet , useLocation , ScrollRestoration} from 'react-router-dom'
import Footer from '../shared/footer/Footer'
import BreadCrumb from '../shared/breadCrumb/BreadCrumb'
import ScrollToTop from '../shared/button/ScrollToTop'

export default function Layout() {
    const location = useLocation()
    const isHomePage = location.pathname === '/'

    return (
    <>
        <Navbar/>
        <main className={isHomePage ? 'pt-0' : 'pt-24 md:pt-28'}>
            {!isHomePage && <BreadCrumb />}
            <Outlet />
        </main>
        <ScrollToTop/>
        <ScrollRestoration/>
        <Footer/>
    </>
    )
}

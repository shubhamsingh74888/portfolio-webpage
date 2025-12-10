import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
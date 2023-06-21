import Footer from "./footer"
import Navbar from "./navbar"
import { ReactNode } from 'react';
// import Navbar from "./navbar/Navbar";

type Props = {
  children: ReactNode
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    </>
  )
}

export default Layout
// import Footer from "./footer"
import Navbar from "./navbar"
import { ReactNode } from 'react';

type Props = {
  children: ReactNode
}

const Layout:React.FC<Props> = ({children}) => {
  return (
    <>
    <Navbar />
    <main>{children}</main>
    {/* <Footer /> */}
    </>
  )
}

export default Layout;
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import Logo from "../../assets/Logo.png";
import NavLinks from "./Navlinks";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import images from "../images";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white sticky top-0 py-2 z-50 ">
      <div className="flex items-center font-medium justify-between container mx-auto">
        <div className="z-50 md:w-auto w-full flex justify-between">
          <img src={images.logo} alt="logo" className="md:cursor-pointer w-40" />
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            {/* <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon> */}
            {open ? <AiOutlineClose /> : <FaBars />}
          </div>
        </div>
        <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <li>
          <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "#A2D95E" : "",
                  })}
                >
                  Home
                </NavLink>
          </li>
          <li>
          <NavLink
                  to="/about-us"
                  style={({ isActive }) => ({
                    color: isActive ? "#A2D95E" : "",
                  })}
                >
                  About Us
                </NavLink>
          </li>
          <li>
          <NavLink
                  to="/faq"
                  style={({ isActive }) => ({
                    color: isActive ? "#A2D95E" : "",
                  })}
                >
                  FAQ
                </NavLink>
          </li>
          
          <NavLinks />
        </ul>
        {/* <div className="md:block hidden">
          <Button />
        </div> */}
        {/* Mobile nav */}
        <ul
          className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          <li className="py-7 px-3 inline-block">
            {/* <Link to="/" >
              Home
            </Link> */}
            <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "#A2D95E" : "",
                  })}
                >
                  Home
                </NavLink>
          </li>
          <li className="py-7 px-3 inline-block">
            {/* <Link to="/" >
              Home
            </Link> */}
            <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "#A2D95E" : "",
                  })}
                >
                  About Us
                </NavLink>
          </li>
          <NavLinks />
          {/* <div className="py-5">
            <Button />
          </div> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;